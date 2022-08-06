import Web3 from "web3";
import {getSetting} from "../utils/getLocal";
import { ethers } from "ethers";
 

let local = localStorage.getItem('languageSet')

let web3;
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
} else if (window.web3) {
    web3 = window.web3;
    console.log("Injected web3 detected.");
} else {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8080");
    web3 = new Web3(provider);

    if(local =='en'){
        alert('Please use the Chrome explorer and install MetaMask.' )
    }else{
        alert('请使用google浏览器，并且安装MetaMask钱包' )
    }

   
    //alert('Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!')
    console.log("No web3 instance injected, using Local web3.");
}

let setJsonNode = getSetting();  

const configabi = setJsonNode.configabi; 
const oracleabi = setJsonNode.oracleabi; 
const erc20abi = setJsonNode.erc20abi; 
const tokenabi = setJsonNode.tokenabi; 
const blockRange = setJsonNode.setting.blockRange; 
const configaddr = setJsonNode.setting.configaddr ; 
const oracleaddr = setJsonNode.setting.oracleaddr ; 
const tokenaddr = setJsonNode.setting.tokenaddr ;    

const configAbiContract = new web3.eth.Contract(configabi, configaddr);
const oracleAbiContract = new web3.eth.Contract(oracleabi, oracleaddr);   
const tokenAbiContract = new web3.eth.Contract(tokenabi, tokenaddr);   
// approval ab
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const erc20Contract = new ethers.Contract(tokenaddr, erc20abi, provider);
const erc20Signed = erc20Contract.connect(signer);  
export { 
    blockRange,
    configAbiContract,
    oracleAbiContract,
    tokenAbiContract,
    erc20Contract,
    erc20Signed,
    tokenaddr,
    oracleaddr 
}