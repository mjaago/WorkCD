// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./CompanyContract.sol";

contract WorkCD {
    address owner;

    mapping(address => Company[]) private ownerCompanies;

    struct Company {
        string name;
        CompanyContract compContract;
        bool exists;
        uint256 id;
    }

    constructor() {
        owner = msg.sender;
    }

    function getCompanies() external view returns (Company[] memory) {
        return ownerCompanies[msg.sender];
    }

    function createCompany(string calldata _name) external {
        CompanyContract comContract = new CompanyContract();
        ownerCompanies[msg.sender].push(
            Company({
                name: _name,
                exists: true,
                compContract: comContract,
                id: ownerCompanies[msg.sender].length
            })
        );
    }

    function deleteCompany(uint256 _id) external {
        Company[] storage companies = ownerCompanies[msg.sender];
        for (uint256 i; i < companies.length; i++) {
            if (companies[i].id == _id) {
                delete companies[i];
            }
        }
    }
}
