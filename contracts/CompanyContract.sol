// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract CompanyContract {
    struct Employee {
        string name;
        address payable empAddress;
        uint256 id;
    }

    address payable owner;
    Employee[] employees;

    constructor(address _owner) {
        owner = payable(_owner);
    }

    function addEmployee(string calldata _name, address _empAddress) external {
        require(msg.sender == owner, "You are not the owner of this company");
        employees.push(
            Employee({
                name: _name,
                empAddress: payable(_empAddress),
                id: employees.length
            })
        );
    }

    function removeEmployee(string calldata _name, address _empAddress) external {
        require(msg.sender == owner, "You are not the owner of this company");
        employees.push(
            Employee({
                name: _name,
                empAddress: payable(_empAddress),
                id: employees.length
            })
        );
    }
}

    function getEmployees() external {
        require(msg.sender == owner, "You are not the owner of this company");
        employees.push(
            Employee({
                name: _name,
                empAddress: payable(_empAddress),
                id: employees.length
            })
        );
    }
}
