// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import {ISuperfluid, ISuperToken, ISuperApp, ISuperAgreement, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

contract CompanyContract is SuperAppBase {
    struct Employee {
        string name;
        int96 salaryFlowRate;
        address payable empAddress;
        bool isEmployed;
        bool isWorking;
    }

    mapping(address => Employee) private employees;
    address[] private employeeAddresses;

    int96 private activeInFlowRate;
    int96 private activeOutFlowRate;

    address payable _owner;
    ISuperfluid private _host; // host
    IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
    ISuperToken private _acceptedToken; // accepted token

    constructor(
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken,
        address owner
    ) {
        assert(address(host) != address(0));
        assert(address(cfa) != address(0));
        assert(address(acceptedToken) != address(0));

        _owner = payable(owner);

        _host = host;
        _cfa = cfa;
        _acceptedToken = acceptedToken;

        uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        _host.registerApp(configWord);
    }

    function startWorking() external isEmployed isNotWorking {
        require(
            activeInFlowRate >=
                (activeOutFlowRate + employees[msg.sender].salaryFlowRate),
            "Not enough funds streamed by employer"
        );
        employees[msg.sender].isWorking = true;
        _host.callAgreement(
            _cfa,
            abi.encodeWithSelector(
                _cfa.createFlow.selector,
                _acceptedToken,
                msg.sender,
                employees[msg.sender].salaryFlowRate,
                new bytes(0)
            ),
            "0x"
        );
        activeOutFlowRate += employees[msg.sender].salaryFlowRate;
    }

    function stopWorking() external isEmployed isWorking {
        employees[msg.sender].isWorking = false;
        _host.callAgreement(
            _cfa,
            abi.encodeWithSelector(
                _cfa.deleteFlow.selector,
                _acceptedToken,
                address(this),
                msg.sender,
                new bytes(0)
            ),
            "0x"
        );
        activeOutFlowRate -= employees[msg.sender].salaryFlowRate;
    }

    function upsertEmployee(
        string calldata name,
        address empAddress,
        int96 salaryFlowRate
    ) external isOwner {
        require(salaryFlowRate >= 0, "Cannot have negative salary rate");
        bool isAlreadyEmployed = employees[empAddress].isEmployed;
        bool isEmployeeWorking = employees[empAddress].isWorking;
        int96 previousSalaryFlowRate = employees[empAddress].salaryFlowRate;
        if (isEmployeeWorking && previousSalaryFlowRate != salaryFlowRate) {
            _host.callAgreement(
                _cfa,
                abi.encodeWithSelector(
                    _cfa.updateFlow.selector,
                    _acceptedToken,
                    empAddress,
                    salaryFlowRate,
                    new bytes(0)
                ),
                "0x"
            );
            activeOutFlowRate += salaryFlowRate - previousSalaryFlowRate;
        }

        if (!isAlreadyEmployed) {
            employeeAddresses.push(empAddress);
        }

        employees[empAddress] = Employee({
            name: name,
            empAddress: payable(empAddress),
            salaryFlowRate: salaryFlowRate,
            isEmployed: true,
            isWorking: isEmployeeWorking
        });
    }

    function removeEmployee(address empAddress) external isOwner {
        employees[empAddress].isEmployed = false;
    }

    function getEmployees() external view isOwner returns (Employee[] memory) {
        Employee[] memory companyEmployees = new Employee[](
            employeeAddresses.length
        );
        for (uint256 i = 0; i < employeeAddresses.length; i++) {
            companyEmployees[i] = employees[employeeAddresses[i]];
        }
        return companyEmployees;
    }

    function getActiveInFlowRate() external view isOwner returns (int96) {
        return activeInFlowRate;
    }

    function getActiveOutFlowRate() external view isOwner returns (int96) {
        return activeOutFlowRate;
    }

    function getOwner() external view isOwner returns (address) {
        return _owner;
    }

    /**************************************************************************
     * SuperApp callbacks
     *************************************************************************/

    function afterAgreementCreated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata, /*_agreementData*/
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        activeInFlowRate = _cfa.getNetFlow(_acceptedToken, address(this));
        return _ctx;
    }

    function afterAgreementUpdated(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, //_agreementId,
        bytes calldata, /*_agreementData*/
        bytes calldata, //_cbdata,
        bytes calldata _ctx
    )
        external
        override
        onlyExpected(_superToken, _agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {
        // TODO: handle case where updated in flow is smaller than outflow
        activeInFlowRate = _cfa.getNetFlow(_acceptedToken, address(this));
        return _ctx;
    }

    function afterAgreementTerminated(
        ISuperToken, //_superToken,
        address, // _agreementClass,
        bytes32, //_agreementId,
        bytes calldata, /*_agreementData*/
        bytes calldata, //_cbdata,
        bytes calldata _ctx
    ) external override onlyHost returns (bytes memory newCtx) {
        activeInFlowRate = 0;
        return _ctx;
    }

    function _isEmployed(address addr) private view returns (bool) {
        return employees[addr].isEmployed;
    }

    function _isOwner(address addr) private view returns (bool) {
        return _owner == addr;
    }

    function _isWorking(address addr) private view returns (bool) {
        return employees[addr].isWorking;
    }

    function _isSameToken(ISuperToken superToken) private view returns (bool) {
        return address(superToken) == address(_acceptedToken);
    }

    function _isCFAv1(address agreementClass) private view returns (bool) {
        return
            ISuperAgreement(agreementClass).agreementType() ==
            keccak256(
                "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
            );
    }

    modifier onlyHost() {
        require(msg.sender == address(_host), "Support only one host");
        _;
    }

    modifier isEmployed() {
        require(
            _isEmployed(msg.sender),
            "Unable to start transaction because you're not employed"
        );
        _;
    }

    modifier isWorking() {
        require(
            _isWorking(msg.sender),
            "Unable to start transaction because you're not employed"
        );
        _;
    }

    modifier isNotWorking() {
        require(
            !_isWorking(msg.sender),
            "Unable to start transaction because you're not employed"
        );
        _;
    }

    modifier isOwner() {
        require(_isOwner(msg.sender), "You are not the owner of this company");
        _;
    }

    modifier onlyExpected(ISuperToken superToken, address agreementClass) {
        require(_isSameToken(superToken), "Not accepted token");
        require(_isCFAv1(agreementClass), "Only CFAv1 supported");
        _;
    }
}
