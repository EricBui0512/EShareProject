/**
 * Created by tuongbui on 15/11/17.
 */
var Network = artifacts.require("./EShareNetWork.sol");
var TestToken = artifacts.require("./TestToken.sol");
var BigNumber = require("bignumber.js");
var Wallet = artifacts.require("./EShareWallet.sol");
var DGX = artifacts.require("./MockDGX.sol");
var ESharePartner = artifacts.require("./ESharePartner.sol");


var networkOwner;
var network;
var esharePartnerOwner;
var esharePartner;
var head = 0;

contract('Scenario EShare', function(accounts){

    beforeEach(function (done) {
        done();
    });
    afterEach(function (done) {
        done();
    });

    it("create eshare newwork", function() {
        networkOwner = accounts[0];
        return Network.new(networkOwner).then(function(instance){
           network = instance;
        });
    });


    it("create eshare partner", function() {
        esharePartnerOwner = accounts[0];
        console.log("new number" + esharePartnerOwner);
        console.log("network" + network);
        return ESharePartner.new(network.address, esharePartnerOwner).then(function(instance){
           esharePartner = instance;
        });


    });

    it("add a product", function() {
        return esharePartner.addProduct(
            [2],
            ["fecd3a0e8a0790c24baa52bd38b50a7c32444b5398037adb1ff687639bf1a08f"],
            [false],
            [false],{from:esharePartnerOwner}).then(function (instance) {

            });
    });


    it("get all products", function() {
        //var temphead = esharePartner.getHeader();

        //console.log("temp" + temphead + "eshare" + esharePartner.head);
        var index = 0;
        var price = 0;
        var data = 0;
        var locked = false;
        var deleted = false;
        return esharePartner.getHeader().then(function(result){
            var temphead = result;
            console.log("temp" + temphead);
            return esharePartner.getListProduct(temphead).then(function(result) {
                index = result[0];
                price = result[1];
                data = result[2];
                locked = result[3];
                deleted = result[4];

                console.log("index " + index + " price " + price + " data " + data + " locked " + locked + " deleted " + deleted);
                assert.equal(price,2,"price is failed");
                assert.equal(locked,false,"price is failed");
            });
        })

    });

    it("add product 3dgx", function () {
        return esharePartner.addProduct([3],
            ["c83cb85f268d6c4f7198f05207108ee33c935847ed7640882e0d8bf4cf14a4f0"],
        [false],
        [false],
            {from:esharePartnerOwner}).then(function (instance) {

        });

    });


    it("get all products", function() {
        //var temphead = esharePartner.getHeader();

        //console.log("temp" + temphead + "eshare" + esharePartner.head);
        var index = 0;
        var price = 0;
        var data = 0;
        var locked = false;
        var deleted = false;
        return esharePartner.getHeader().then(function(result){
            var temphead = result;
            console.log("temp" + temphead);
            return esharePartner.getListProduct(temphead).then(function(result) {
                index = result[0];
                price = result[1];
                data = result[2];
                locked = result[3];
                deleted = result[4];

                console.log("index " + index + " price " + price + " data " + data + " locked " + locked + " deleted " + deleted);
                assert.equal(price,3,"price is failed");
                assert.equal(locked,false,"price is failed");
            });
        })

    });

    it("update product 1 to 4 dgx", function() {
        return esharePartner.updateProduct([2], [4],
            ["c83cb85f268d6c4f7198f05207108ee33c935847ed7640882e0d8bf4cf14a4f0"],
            [false],
            [true],
            {from: esharePartnerOwner}).then(function (instance) {

        });
    });


    it("get all products", function() {
        //var temphead = esharePartner.getHeader();

        //console.log("temp" + temphead + "eshare" + esharePartner.head);
        var index = 0;
        var price = 0;
        var data = 0;
        var locked = false;
        var deleted = false;
        return esharePartner.getHeader().then(function(result){
            var temphead = result;
            console.log("temp" + temphead);
            return esharePartner.getListProduct(temphead).then(function(result) {
                index = result[0];
                price = result[1];
                data = result[2];
                locked = result[3];
                deleted = result[4];
                console.log("index " + index + " price " + price + " data " + data + " locked " + locked + " deleted " + deleted);
                assert.equal(price,4,"price is failed");
                assert.equal(locked,false,"price is failed");
                assert.equal(deleted,true,"deleted value is wrong");
            });
        })

    });


})