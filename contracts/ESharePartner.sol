pragma solidity ^0.4.0;

import "./ERC20Interface.sol";

contract ESharePartner {
    address public esharePartner;
    address public eshareNetwork;
    uint constant PRECISION = (10**18);
    bool public activated;
    uint public head = 0;

    struct ProductInfo {
        uint index;
        uint price;
        bytes32 data;
        bool locked;
        bool deleted;
    }

    function getHeader() constant returns(uint) {

        return head;
    }



    mapping (uint => ProductInfo)  listProducts;

    event ErrorReport( address indexed origin, uint error, uint errorInfo );



    /// @dev c'tor.
    /// @param _eshareNetwork The address of eshare network
    /// @param _esharePartner Address of the eshare partner
    function ESharePartner(address _eshareNetwork, address _esharePartner) {
            esharePartner = _esharePartner;
            eshareNetwork = _eshareNetwork;
            activated = true;
    }

    event AddProduct(uint price, bytes32 data, bool locked, bool deleted);

    /// @param price an array of price,
    /// @param data an arrya of data sha3
    /// @param locked an array of lock
    /// @param deleted an array of deleted value
    function addProduct(uint[] price, bytes32[] data, bool[] locked, bool[] deleted) returns(bool) {
        if ( msg.sender != esharePartner) {
            /// sender must be an eshare partner
            ErrorReport(tx.origin, 0x9100000000, uint(msg.sender));
            return false;

        }
        for ( uint i= 0; i < data.length; i++) {
            AddProduct(price[i], data[i], locked[i], deleted[i]);
            head++;
            listProducts[head] = ProductInfo(head,price[i],data[i],locked[i],deleted[i]);

        }

        ErrorReport( tx.origin, 0, 0 );
        return true;

    }

    event UpdateProduct(uint index, uint price, bytes32 data, bool locked, bool deleted);

    /// @param index is index of product
    /// @param price an array of price,
    /// @param data an arrya of data sha3
    /// @param locked an array of lock
    /// @param deleted an array of deleted value
    function updateProduct (uint[] index, uint[] price, bytes32[] data, bool[] locked, bool[] deleted) returns(bool){
        if (msg.sender != esharePartner) {
            /// sender must be an eshare partner
            ErrorReport(tx.origin, 0x9200000000, uint(msg.sender));
            return false;
        }

        for (uint i = 0; i < index.length; i++) {
            ProductInfo memory productInfo = listProducts[index[i]];
            if(productInfo.price == 0) return false;
            UpdateProduct(index[i], price[i], data[i], locked[i], deleted[i]);
            listProducts[index[i]] =  ProductInfo(index[i],price[i],data[i],locked[i],deleted[i]);
        }

        ErrorReport( tx.origin, 0, 0 );
        return true;

    }

    /// return list of product
    function getListProduct(uint _index) constant returns(uint index, uint price, bytes32 data, bool locked, bool deleted ) {
        ProductInfo memory productInfo = listProducts[_index];
        index = _index;
        price = 0;
        data = 0;
        locked = false;
        deleted = false;
        if ( productInfo.price != 0) {
            price = productInfo.price;
            data = productInfo.data;
            locked = productInfo.locked;
            deleted = productInfo.deleted;
        }
    }









}
