import React, { useState } from "react";
import FundingAbi from "../contracts/Funding.json";
const { ethers } = require("ethers");

export function ContractManager() {
  let moneyVal;
  let provider;
  let [signer, setSigner] = useState();
  let networkId;
  let [contract, setContract] = useState();
  let [moneyInPool, setMoneyInPool] = useState(0);
  let [contractOwner, setContractOwner] = useState("");
  let [accounts, setAccounts] = useState();
  const [isloading, setLoading] = useState(true);
  

  const connectMetamask = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    //const accounts = await provider.send("eth_requestAccounts", []);
    accounts = await provider.listAccounts();
    setAccounts(accounts);
    console.log(accounts[0]);
    signer = provider.getSigner();
    setSigner(signer);
    networkId = await provider.getNetwork();
    console.log("netid", networkId);
    // let accounts = provider.listAccounts()
    //                   .then(result => console.log(result))
    //                   .catch(error => console.log(error))
    let balance = await provider.getBalance(
      "0xBC8240200b543038B8EfEA521D7Ee43BD7B915b1"
    );
    let balanceEth = ethers.utils.formatEther(balance);
    console.log("balance", balanceEth);
    await connectSmartContract();
  };

  const connectSmartContract = async () => {
    var privateKey =
      "4a1b49804b2beaa3dec0271714665758c23f0d2b235ed23aaab7a16b47f319c8";
    var wallet = new ethers.Wallet(privateKey, provider);
    const networkData = FundingAbi.networks[networkId.chainId];
    console.log("networkData", networkData);

    contract = new ethers.Contract(networkData.address, FundingAbi.abi, wallet);
    //contract.owner();
    setContractOwner(contract.signer.address);
    setContract(contract);
    await getMoney();
    setLoading(false);
  };

  const getMoney = async () => {
    const money = await contract.moneyPool();
    setMoneyInPool(Math.floor(ethers.utils.formatEther(money)));
    console.log('update');
  };

  const startFunding = async () => {
    const isAvaliable = await contract.isAvaliable();
    if (isAvaliable) {
      alert("This project already starts");
      return;
    }
    console.log("start funding");
    if (accounts[0] == contractOwner) {
      console.log("call");
      const tx = await contract.startFunding();
      console.log("tx from startFunding", tx);
    } else {
      alert("only contract owner can use this function");
    }
  };

  const giveFund = async () => {
    console.log("give fund");
    //ethers.utils.parseEther("1.0")
    const tx = await contract.fundTo({ value: ethers.utils.parseEther("0.001") });
    console.log(tx);
    await getMoney();
  };

  const closeFunding = async () => {
    console.log("close funding");
  };

  return {
    connectMetamask,
    moneyInPool,
    startFunding,
    giveFund,
    closeFunding,
  };
}