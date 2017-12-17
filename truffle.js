/*require('babel-register');*/
/*var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");

// Get our mnemonic and create an hdwallet
var mnemonic = "some words that are in the mnemonic that i use";
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://kovan.infura.io/m1h8YPsOpTXly3uDT2eU";
var engine = new ProviderEngine();
engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(); // Required by the provider engine.*/

module.exports = {
    networks: {
      /* kovan: {
            network_id: 42,    // Official kovan network id
            host:'localhost',
            port:8545,
            gas: 4500000
        },*/
        development: {
            host: "localhost",
            port: 8545,
            gas: 4500000,
            network_id: "*",
           gasPrice: 40000000000
           // Match any network id*!/!*!/
        }
    }

};




/*
module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: '42'
            /!* gas: 40000000,
             gasPrice: 40000000000,
             network_id: "*" // Match any network id*!/
        }
    }
};
*/
