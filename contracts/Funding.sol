pragma solidity ^0.8.1;

// SPDX-License-Identifier: GPL-3.0
contract Funding {
    address public owner;
    uint256 public moneyPool;
    bool public isAvaliable;

    constructor() {
        owner = msg.sender;
    }

    function fundTo() external payable {
        require(isAvaliable, "This project not avaliable to fund");
        moneyPool += msg.value;
    }

    function startFunding() external {
        require(
            msg.sender == owner,
            "Only owner can start this funding project"
        );
        isAvaliable = true;
    }

    function endFunding() external {
        require(
            msg.sender == owner,
            "Only owner can close this funding project"
        );
        isAvaliable = false;
        payable(owner).transfer(moneyPool);
    }
}
