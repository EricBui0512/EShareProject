pragma solidity ^0.4.0;

import "./ERC20Interface.sol";
import "./EShareReserve.sol";
import "./ESharePartner.sol";


contract EShareNetWork {
    address admin;
    ERC20 constant public ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);
    uint constant PRECISION = (10**18);
    uint constant EPSILON = (1000);
    EShareReserve[] public reserves;
    ESharePartner[] public esharePartners;

    mapping(address=>ESharePartner) public esharePartnerOwners;

    mapping(address=>mapping(bytes32=>bool)) perReserverListedPairs;

    event ErrorReport(address indexed origin, uint error, uint errorInfo);

    function EShareNetWork(address _admin) {
        admin = _admin;
    }

    function getNumberESharePartner() constant returns(uint) {
        return esharePartners.length;
    }

    function getESharePartner() constant returns(ESharePartner[]) {
        return esharePartners;
    }


    event AddESharePartner(ESharePartner esharePartner, address esharePartnerOwner, bool add);
    /// can only used by admin
    function addESharePartner( ESharePartner _esharePartner, address _esharePartnerOwner, bool add) {
        if (msg.sender != admin ) {
            ErrorReport( msg.sender, 0x97000000, 0);
            return;
        }

        if ( add ) {
            esharePartners.push(_esharePartner);

            AddESharePartner( _esharePartner, _esharePartnerOwner, true);
            esharePartnerOwners[_esharePartnerOwner] = _esharePartner;

        } else {
            for ( uint i = 0; i < esharePartners.length; i++ ) {
                if ( esharePartners[i] == _esharePartner) {
                    if ( esharePartners.length == 0) return;
                    esharePartners[i] = esharePartners[--esharePartners.length];
                    AddESharePartner( _esharePartner, _esharePartnerOwner, false);
                    break;
                }
            }
        }
        ErrorReport( msg.sender, 0, 0);
    }

    function isESharePartner(address _esharePartnerOwner) constant returns(ESharePartner){
        ESharePartner esharePartner = esharePartnerOwners[_esharePartnerOwner];
        return esharePartner;
    }


    struct EShareReservePairInfo{
        uint rate;
        uint reserveBalance;
        EShareReserve reserve;
    }

    function getNumReserves() constant returns(uint) {
        return reserves.length;
    }


    function getRate(ERC20 source, ERC20 dest, uint reserveIndex) constant returns (uint rate, uint expBlock, uint balance) {
        (rate, expBlock, balance) = reserves[reserveIndex].getPairInfo(source, dest);
    }



    /// check whether trade input source in the list Reserve and whether sufficient to trade
    function validateTradeInput( ERC20 source, uint srcAmount) constant internal returns (bool) {
        if ( source != ETH_TOKEN_ADDRESS && msg.value > 0) {
            ErrorReport(tx.origin, 0x85000000, 0);
            return false;
        }
        else if ( source == ETH_TOKEN_ADDRESS && msg.value != srcAmount) {
            // wrong amount
            ErrorReport(tx.origin, 0x85000001, msg.value);
            return false;
        } else if ( source != ETH_TOKEN_ADDRESS) {
            if ( source.allowance(msg.sender, this) < srcAmount) {
                // insufficient amount
                ErrorReport(tx.origin, 0x85000002, msg.value);
                return false;
            }
        }
        return true;
    }

    struct ReserveTokenInfo {
        uint rate;
        EShareReserve reserve;
        uint reserveBalance;
    }

    struct TradeInfo {
        uint convertedDestAmount;
        uint remainedSourceAmount;
        bool tradeFailed;
    }



     event AddReserve(EShareReserve reserve, bool add);
    /// can only used by admin
    function addReserve( EShareReserve reserve, bool add) {
        if (msg.sender != admin ) {
            ErrorReport( msg.sender, 0x87000000, 0);
            return;
        }

        if ( add ) {
            reserves.push(reserve);
            AddReserve( reserve, true);

        } else {
            // will have trouble if more than 50k reserves...
            for ( uint i = 0; i < reserves.length; i++ ) {
                if ( reserves[i] == reserve) {
                    if ( reserves.length == 0) return;
                    reserves[i] = reserves[--reserves.length];
                    AddReserve( reserve, false);
                    break;
                }
            }
        }
        ErrorReport( msg.sender, 0, 0);
    }


    event ListPairsForReserve ( address reserve, ERC20 source, ERC20 dest, bool add);

    // only used by admin
    function listPairForReserve( address reserve, ERC20 source, ERC20 dest, bool add) {
        if ( msg.sender != admin) {
            ErrorReport( msg.sender, 0x88000000, 0);
            return;
        }
        (perReserverListedPairs[reserve])[sha3(source,dest)] = add;
        ListPairsForReserve( reserve, source, dest, add);
        ErrorReport( tx.origin, 0, 0);
    }



    // should be called off chain with as much gas as needed
    function getReserves() constant returns(EShareReserve[]) {
        return reserves;
    }


    function getBalance(ERC20 token) constant returns(uint) {
        if ( token == ETH_TOKEN_ADDRESS) return this.balance;
        else return token.balanceOf(this);
    }

}

