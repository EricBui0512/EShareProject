pragma solidity ^0.4.0;

import "./ERC20Interface.sol";


contract MockDGX {
    address public owner;

    function MockDGX() {
        owner = msg.sender;
    }

    function withdrawEther(uint amount) {
        if ( tx.origin != owner) revert();
        msg.sender.transfer(amount);
    }

    function withdrawToken(ERC20 token, uint amount) {
        if( tx.origin != owner) revert();
        token.transfer(msg.sender, amount);
    }

    function () payable{

    }

    function depositEther() payable {
        // just to simplify interaction with testrpc
    }
}