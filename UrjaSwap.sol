// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UrjaSwap {
    address public owner;

    struct User {
        uint balance;
        uint energySold;
        uint energyBought;
    }

    struct Transaction {
        address buyer;
        address seller;
        uint amount;
        uint price;
        uint timestamp;
    }

    mapping(address => User) public users;
    Transaction[] public transactions;

    event EnergySold(address indexed seller, uint amount, uint price);
    event EnergyBought(address indexed buyer, address indexed seller, uint amount, uint price);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner!");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerUser() public {
        require(users[msg.sender].balance == 0, "User already registered!");
        users[msg.sender] = User(1000, 0, 0); // Initial balance 1000 IOTA
    }

    function sellEnergy(uint amount, uint price) public {
        require(amount > 0 && price > 0, "Invalid amount or price!");
        users[msg.sender].balance += amount * price;
        users[msg.sender].energySold += amount;

        emit EnergySold(msg.sender, amount, price);
    }

    function buyEnergy(address seller, uint amount, uint price) public {
        uint totalCost = amount * price;
        require(users[msg.sender].balance >= totalCost, "Insufficient balance!");

        users[msg.sender].balance -= totalCost;
        users[msg.sender].energyBought += amount;
        users[seller].balance += totalCost;

        transactions.push(Transaction(msg.sender, seller, amount, price, block.timestamp));

        emit EnergyBought(msg.sender, seller, amount, price);
    }

    function getTransactionHistory() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getUserBalance(address user) public view returns (uint) {
        return users[user].balance;
    }
}