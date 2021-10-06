// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "./CompanyContract.sol";

contract WorkCD {
    address _owner;

    Company[] public companies;

    ISuperfluid private _host; // host
    IConstantFlowAgreementV1 private _cfa; // the stored constant flow agreement class address
    ISuperToken private _acceptedToken; // accepted token

    struct Company {
        string name;
        CompanyContract compContract;
        bool exists;
        uint256 id;
        address owner;
    }

    constructor(
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken,
        address owner
    ) {
        assert(address(host) != address(0));
        assert(address(cfa) != address(0));
        assert(address(acceptedToken) != address(0));

        _owner = owner;

        _host = host;
        _cfa = cfa;
        _acceptedToken = acceptedToken;
    }

    function getCompanies() external view returns (Company[] memory) {
        return companies;
    }

    function createCompany(string calldata _name) external {
        CompanyContract comContract = new CompanyContract(
            _host,
            _cfa,
            _acceptedToken,
            msg.sender
        );
        companies.push(
            Company({
                name: _name,
                exists: true,
                compContract: comContract,
                id: companies.length,
                owner: msg.sender
            })
        );
    }
}
