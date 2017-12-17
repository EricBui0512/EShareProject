pragma solidity ^0.4.0;

import "./ERC20Interface.sol";
import "./EShareReserve.sol";
import "./EShareNetWork.sol";

contract EShareWallet {
    address public owner;
    EShareNetWork public eShareNetwork;
    ERC20 constant public ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    event ErrorReport(address indexed origin, uint error, uint errorInfo);

    event NewWallet (address indexed owner, address eShareNetwork);

    function EShareWallet(EShareNetWork _eShareNetwork) {
        owner = msg.sender;
        eShareNetwork = _eShareNetwork;
        NewWallet( msg.sender, eShareNetwork);
    }

    event SetEShareNetwork( address indexed sender, address network);

    /// can only be used by admin
    function setEShareNetwork( EShareNetWork network) {
        if ( msg.sender != owner) {
            ErrorReport( msg.sender, 0x89000000, uint(owner));
            return;
        }

        eShareNetwork  = network;
        ErrorReport ( msg.sender, 0 , 0);
        SetEShareNetwork(msg.sender, network);

    }

    event IncomingEther(address sender, uint amountInWei);

    function() payable {
        return receiveEther();

    }


    /// notice it is posisble to deposit token without callign this funciton
    function receiveEther() payable {
        IncomingEther( msg.sender, msg.value);
    }

    event IncomingTokens(address form, ERC20 token, uint amount);

    /// notice it is posisble to deposit token without callign this funciton
    function receiveTokens( ERC20 token, address from, uint amount) {
        if ( ! token.transferFrom(from, this, amount)) {
            ErrorReport( msg.sender, 0x8a000000, uint(owner));
            return;
        }

        IncomingTokens( from, token, amount);

    }

    ///only called by owner
    function execute(address to, uint value, bytes data) {
        if (msg.sender != owner) {
            ErrorReport( msg.sender, 0x8b00001, uint(owner));
            return;
        }

        if ( ! to.call.value(value)(data)) {
            ErrorReport( msg.sender, 0x8b000001, uint(owner));
            return;
        }

        ErrorReport(msg.sender, 0, 0);
        return;
    }






}