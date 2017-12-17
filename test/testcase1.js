var TestToken = artifacts.require("./TestToken.sol");
var Reserve = artifacts.require("./EShareReserve.sol");
var Network = artifacts.require("./EShareNetWork.sol");
var Wallet = artifacts.require("./EShareWallet.sol");
var DGX = artifacts.require("./MockDGX.sol");
var BigNumber = require("bignumber.js");
var ESharePartner = artifacts.require("./ESharePartner.sol");

var wallet;

var token0;
var tokenAddress0;
var token1;
var tokenAddress1;
var token2;
var tokenAddress2;

var tokenOwner;

var network;

var networkOwner;

var reserve;
var reserveOwner;

var ethAddress = new BigNumber("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

var conversionRate0 = (((new BigNumber(10)).pow(18)).mul(2));
var counterConversionRate0 = (((new BigNumber(10)).pow(18)).div(2));
var conversionRate1 = (((new BigNumber(10)).pow(18)).mul(4));
var counterConversionRate1 = (((new BigNumber(10)).pow(18)).div(4));
var conversionRate2 = (((new BigNumber(10)).pow(18)).mul(8));
var counterConversionRate2 = (((new BigNumber(10)).pow(18)).div(8));

var expBlock0 = 10*10;
var expBlock1 = 10*11;

var expBlock2 = 10*12;


var dgx;

var esharePartnerOwner;
var esharePartner;

contract('Scenario One', function(accounts) {

    beforeEach(function (done) {
        done();
    });
    afterEach(function (done) {
        done();
    });


    it("create token 0", function () {
        tokenOwner = accounts[0];
        return TestToken.new("Test 0", "TST0", {from: tokenOwner}).then(function (instance) {
            token0 = instance;
            tokenAddress0 = token0.address;
        });
    });


    it("create token 1", function () {
        tokenOwner = accounts[0];
        return TestToken.new("Test 1", "TST1", {from: tokenOwner}).then(function (instance) {
            token1 = instance;
            tokenAddress1 = token1.address;
        });
    });

    it("create token 2", function () {
        tokenOwner = accounts[0];
        return TestToken.new("Test 2", "TST2", {from: tokenOwner}).then(function (instance) {
            token2 = instance;
            tokenAddress2 = token2.address;
        });
    });


    it("create dgx and transfer funds", function () {
        var amount = (new BigNumber(10)).pow(40);
        return DGX.new().then(function (instance) {
            dgx = instance;
            return token0.transfer(dgx.address, amount);
        }).then(function () {
            return token1.transfer(dgx.address, amount);
        }).then(function () {
            return token2.transfer(dgx.address, amount);
        }).then(function () {
            return dgx.depositEther({value: (new BigNumber(10)).pow(18)});
        });
    });







    it("create network", function() {
        networkOwner = accounts[0];
        return Network.new(networkOwner).then(function(instance){
            network = instance;
        });
    });



    it("create reserve", function() {
        reserveOwner = accounts[0];
        return Reserve.new(network.address, reserveOwner).then(function(instance){
            reserve = instance;
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

    it("add eshare partner", function () {
        console.log("eshare address" + esharePartner.address);
        return network.addESharePartner(esharePartner.address, esharePartnerOwner, true,{from:networkOwner}).then(function(){
            return network.getNumberESharePartner().then(function(result){
                var value = result;
                console.log("value " + value);
                assert.equal(value, 1, "add succesfull");
                return network.getESharePartner().then(function(result){
                    console.log("address " + result[0]);
                    return network.isESharePartner(esharePartnerOwner).then(function(result){
                        console.log("address partner" + result);
                    })
                });
            });

        });

    });


    /**
     * token0.approve(reserve.address,amount,{from:reserveOwner}).then(function(){
            return reserve.depositToken(tokenAddress0, amount, {from:reserveOwner});
        })
     testToken.at(dgxTokenAddress).approve(dgxReserve,500000,{from:dgxReserverOwner}).then(function(){
        dgxReserverContract.at(dgxReserve).depositToken(dgxTokenAddress,500000,{from:dgxReserverOwner});
     })

     *
     *
     *
     */

    it("deposit test tokens", function() {
        var amount = (new BigNumber(10)).pow(24);
        /// now token approve not work and use transfer fund
        return token0.transfer(reserve.address,amount,{from:reserveOwner}).then(function(){
            return reserve.depositToken(tokenAddress0, amount, {from:reserveOwner});
        }).then(function(){
            return token1.transfer(reserve.address,amount,{from:reserveOwner});
        }).then(function(){
            return reserve.depositToken(tokenAddress1, amount, {from:reserveOwner});
        }).then(function(){
            return token2.transfer(reserve.address,amount,{from:reserveOwner});
        }).then(function(){
            return reserve.depositToken(tokenAddress2, amount, {from:reserveOwner});
        });
    });

    it("list test token0 vs ETH in reserve", function() {
        return reserve.setRate([tokenAddress0],
            [ethAddress],
            [conversionRate0],
            [expBlock0],
            true, {from:reserveOwner}).then(function(instance){
        });
    });

    it("list ETH vs test token in reserve", function() {
        return reserve.setRate([ethAddress],
            [tokenAddress0],
            [counterConversionRate0],
            [expBlock0],
            true, {from:reserveOwner}).then(function(instance){
        });
    });

    it("list test token1 vs ETH in reserve", function() {
        return reserve.setRate([tokenAddress1],
            [ethAddress],
            [conversionRate1],
            [expBlock1],
            true, {from:reserveOwner}).then(function(instance){
        });
    });

    it("list ETH vs test token in reserve", function() {
        return reserve.setRate([ethAddress],
            [tokenAddress1],
            [counterConversionRate1],
            [expBlock1],
            true, {from:reserveOwner}).then(function(instance){
        });
    });

    it("list test token2 vs ETH in reserve", function() {
        return reserve.setRate([tokenAddress2],
            [ethAddress],
            [conversionRate2],
            [expBlock2],
            true, {from:reserveOwner}).then(function(instance){
        });
    });

    it("list ETH vs test token2 in reserve", function() {
        return reserve.setRate([ethAddress],
            [tokenAddress2],
            [counterConversionRate2],
            [expBlock2],
            true, {from:reserveOwner}).then(function(instance){
        });
    });



    it("send ETH to reserve", function() {
        return reserve.depositEther({from:reserveOwner, value:100000}).then(function(instance){

        });
    });

    it("add reserve to network", function() {
        return network.addReserve(reserve.address, true, {from:networkOwner}).then(function(instance){

        });
    });

    it("list pair 0 to network", function() {
        return network.listPairForReserve(reserve.address, tokenAddress0, ethAddress, true, {from:networkOwner}).then(function(instance){
        });
    });

    it("list pair 1 to network", function() {
        return network.listPairForReserve(reserve.address, tokenAddress1, ethAddress, true, {from:networkOwner}).then(function(instance){
        });
    });

    it("list pair 2 to network", function() {
        return network.listPairForReserve(reserve.address, tokenAddress2, ethAddress, true, {from:networkOwner}).then(function(instance){
        });
    });


    it("list revesre pair 0 to network", function() {
        return network.listPairForReserve(reserve.address, ethAddress, tokenAddress0, true, {from:networkOwner}).then(function(instance){
        });
    });

    it("list revesre pair 1 to network", function() {
        return network.listPairForReserve(reserve.address, ethAddress, tokenAddress1, true, {from:networkOwner}).then(function(instance){
        });
    });

    it("list revesre pair 2 to network", function() {
        return network.listPairForReserve(reserve.address, ethAddress, tokenAddress2, true, {from:networkOwner}).then(function(instance){
        });
    });


    it("do trade token 0", function() {
        return token0.approve(network.address, 2000, {from:tokenOwner, gas:4000000}).then(function(result){
            return network.trade( tokenAddress0, 2000, ethAddress, tokenOwner, 0xFFFFFFFF, conversionRate0, false);
        }).then(function(result){
            return token0.balanceOf(reserve.address);
        }).then(function(result){
            console.log(result.toString(10));
            return reserve.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
            return network.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
        });
    });

    it("do revese trade token 0", function() {
        return network.trade( ethAddress, 1001, tokenAddress0, tokenOwner, 0xFFFFFFFF, counterConversionRate0, false,{value:1001}).then(function(result){
        }).then(function(result){
            return token0.balanceOf(reserve.address);
        }).then(function(result){
            console.log(result.toString(10));
            return reserve.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
            return network.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
        });
    });


    it("do trade token 1", function() {
        return token1.approve(network.address, 2000, {from:tokenOwner, gas:4000000}).then(function(result){
            return network.trade( tokenAddress1, 2000, ethAddress, tokenOwner, 0xFFFFFFFF, conversionRate1, false);
        }).then(function(result){
            //assert.equal(true,false,"mg");
            return token1.balanceOf(reserve.address);
        }).then(function(result){
            console.log(result.toString(10));
            return reserve.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
            return network.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
        });
    });

    it("do revese trade token 1", function() {
        return network.trade( ethAddress, 1001, tokenAddress1, tokenOwner, 0xFFFFFFFF, counterConversionRate1, false,{value:1001}).then(function(result){
        }).then(function(result){
            return token1.balanceOf(reserve.address);
        }).then(function(result){
            console.log(result.toString(10));
            return reserve.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
            return network.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
        });
    });

    it("do trade token 2", function() {
        return token2.approve(network.address, 2000, {from:tokenOwner, gas:4000000}).then(function(result){
            return network.trade( tokenAddress2, 2000, ethAddress, tokenOwner, 0xFFFFFFFF, conversionRate2, false);
        }).then(function(result){
            //assert.equal(true,false,"mg");
            return token2.balanceOf(reserve.address);
        }).then(function(result){
            console.log(result.toString(10));
            return reserve.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
            return network.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
        });
    });

    it("do revese trade token 2", function() {
        return network.trade( ethAddress, 1001, tokenAddress2, tokenOwner, 0xFFFFFFFF, counterConversionRate2, false,{value:1001}).then(function(result){
        }).then(function(result){
            return token2.balanceOf(reserve.address);
        }).then(function(result){
            console.log(result.toString(10));
            return reserve.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
            return network.getBalance(ethAddress);
        }).then(function(result){
            console.log(result.toString(10));
        });
    });

    it("get rate info", function() {
        var rate;
        var expBlock;
        var balance;

        return network.getRate( tokenAddress0, ethAddress, 0 ).then(function(result){
            rate = result[0];
            expBlock = result[1];
            balance = result[2];
            assert.equal(conversionRate0.toString(10), rate.toString(10), "conversion rate 0 is not as expected");

            return network.getRate( tokenAddress1, ethAddress, 0 );
        }).then(function(result){
            rate = result[0];
            assert.equal(conversionRate1.toString(10), rate.toString(10), "conversion rate 1 is not as expected");
            return network.getRate( tokenAddress2, ethAddress, 0 );
        }).then(function(result){
            rate = result[0];
            assert.equal(conversionRate2.toString(10), rate.toString(10), "conversion rate 2 is not as expected");
            return network.getRate( ethAddress, tokenAddress0, 0 );
        }).then(function(result){
            rate = result[0];
            assert.equal(counterConversionRate0.toString(10), rate.toString(10), "counter conversion rate 0 is not as expected");
            return network.getRate( ethAddress, tokenAddress1, 0 );
        }).then(function(result){
            rate = result[0];
            assert.equal(counterConversionRate1.toString(10), rate.toString(10), "counter conversion rate 1 is not as expected");
            return network.getRate( ethAddress, tokenAddress2, 0 );
        }).then(function(result){
            rate = result[0];
            assert.equal(counterConversionRate2.toString(10), rate.toString(10), "counter conversion rate 1 is not as expected");
        });

    });
    it("withdraw tokens", function() {
        var amount = (new BigNumber(10)).pow(4);
        return reserve.withdraw(token0.address, amount, polo.address);
    });

    it("withdraw ether", function() {
        var amount = (new BigNumber(10)).pow(1);
        return reserve.withdraw(ethAddress, amount, bittrex.address);
    });



    it("print address", function() {
        console.log("token0 = " + token0.address.toString(16));
        console.log("token1 = " + token1.address.toString(16));
        console.log("token2 = " + token2.address.toString(16));
        console.log("reserve = " + reserve.address.toString(16));
        console.log("network = " + network.address.toString(16));
        console.log("reserve owner = " + accounts[0].toString(16));

    });





});




