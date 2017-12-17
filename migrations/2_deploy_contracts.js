
var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");


var ERC20 = artifacts.require("ERC20");
var BikeCoinNetwork = artifacts.require("./EShareNetWork.sol");
var BikeCoinReserve = artifacts.require("./EShareReserve.sol");
var BikeCoinWallet = artifacts.require("./EShareWallet.sol");
var dgx = artifacts.require("./MockDGX.sol");
var exchange = artifacts.require("./MockExchangeDepositAddress.sol");
var testToken = artifacts.require("./TestToken.sol");


/// DAO
//var dao = artifacts.require("./DAO.sol");
var daotoken = artifacts.require("./EShareDAOTokenCreationProxyTransferer.sol");
var managedAccount = artifacts.require("./ManagedAccount.sol");
var token = artifacts.require("./Token.sol");
var tokenCreation = artifacts.require("./TokenCreation.sol");
var sampleOffer = artifacts.require("./SampleOffer.sol");

var ESharePartner = artifacts.require("./ESharePartner.sol");

var mytoken = artifacts.require("./MyToken.sol");

var DAO_Creator = artifacts.require("DAO_Creator");

var DAO = artifacts.require("EShareDAO");


var mutil = artifacts.require("./Multiply7.sol");

var default_proposal_deposit = 1;
var min_tokens_to_create = 2;
var seconds_from_now = 1200;
var closing_time =  Math.floor(Date.now() / 1000) + seconds_from_now;
var curator = "0x0043f39A2ab831769269D48aB73723536f5e136B";
///var curator = "0x596a560d0c680705062e68bbabc00bc9df0588b1";

var DAO_Creator_Address="0x545bb201a3a85e8397644a12b632fc4d36df2f70";
///var DAO_Creator_Address=" 0xb302537a2e8d1040a69bc5b093caade68e52496c";


module.exports = function(deployer) {
/*

    deployer.deploy(ConvertLib);
    deployer.link(ConvertLib, MetaCoin);
    deployer.deploy(MetaCoin);
*/

    deployer.deploy(ESharePartner);


    //deployer.deploy(ERC20);
   /* deployer.deploy(BikeCoinReserve);
    deployer.deploy(BikeCoinNetwork);
    deployer.deploy(BikeCoinWallet);
    deployer.deploy(dgx);
    deployer.deploy(exchange);
    deployer.deploy(testToken);*/

    //deployer.deploy(BikeCoinReserve,'0x6f83eac8241106f335c38e78c4caf5f65b74ac06','0x007896a9aAE4D2803537C299779ab49EC5835e78');


   // deployer.deploy(BikeCoinNetwork,'0x0043f39A2ab831769269D48aB73723536f5e136B');
    //deployer.deploy(BikeCoinReserve,'0xfa379ffb7f561b17783142084131ea90cb01bc65','0x007896a9aAE4D2803537C299779ab49EC5835e78');

    /* deployer.deploy(testToken,"DIGIX","DGD");
     deployer.deploy(testToken,"TESTCOIN","TC1");*/

    //deployer.deploy(testToken,"MONKEY","MKC");

  //  deployer.deploy(DAO_Creator)

   /*deployer.deploy(DAO_Creator).then(function () {
        return deployer.deploy(DAO, curator,DAO_Creator.address,
            web3.toWei(default_proposal_deposit, "ether"),  web3.toWei(min_tokens_to_create, "ether"),
            closing_time,
            0);

    })*/


   /* deployer.deploy(DAO, curator, DAO_Creator_Address,
        web3.toWei(default_proposal_deposit, "ether"),  web3.toWei(min_tokens_to_create, "ether"),
        closing_time,
        0);*/

  /*  deployer.deploy(DAO, curator, DAO_Creator_Address,
        web3.toWei(default_proposal_deposit, "ether"),  web3.toWei(min_tokens_to_create, "ether"),
        closing_time,
        0);*/


   /* deployer.deploy(dao);
    deployer.deploy(managedAccount);
    deployer.deploy(daotoken);
    deployer.deploy(token);
    deployer.deploy(tokenCreation);
    deployer.deploy(sampleOffer);

    deployer.deploy(mytoken);*/

    //deployer.deploy(mutil);







 /* deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(A);
  deployer.deploy(creator);
  deployer.deploy(OwnerToken);

  deployer.deploy(ProofOfExistence2);*/

};
