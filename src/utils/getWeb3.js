import Web3 from "web3";

let web3; 
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else if (window.web3) {
  web3 = window.web3;
  console.log("Injected web3 detected.");
} else {
  const provider = new Web3.providers.HttpProvider(
    "http://127.0.0.1:8080"
  );
  web3 = new Web3(provider);
  console.log("No web3 instance injected, using Local web3.");

}
export default web3;

// export default {
//   install: function (Vue, options) {
//     
//     Vue.prototype.$web3 = web3
//   }
// }




// const getWeb3 =  () =>
//   new Promise((resolve, reject) => { 
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         resolve(web3);
//         /* try {  
//              window.ethereum.enable() 
//             .catch(function (reason) {
//                 alert(reason);
//             }).then(function (accounts) {
//                 // You also should verify the user is on the correct network:
//                 //你也可以验证用户接入了正确的网络
//                 if (ethereum.networkVersion !== desiredNetwork) {
//                     alert('This application requires the main network, please switch it in your MetaMask UI.')
//                 } 
//                 //一旦获取了用户账号，你就可以签名交易
//                 const account = accounts[0] 
//             });


//         } catch (error) {
//           reject(error);
//         } */
//       }
//       // Legacy dapp browsers...
//       else if (window.web3) {
//         // Use Mist/MetaMask's provider.
//         const web3 = window.web3;
//         console.log("Injected web3 detected.");
//         resolve(web3);
//       }
//       // Fallback to localhost; use dev console port by default...
//       else {
//         const provider = new Web3.providers.HttpProvider(
//           "http://127.0.0.1:8080"
//         );
//         const web3 = new Web3(provider);
//         console.log("No web3 instance injected, using Local web3.");
//         resolve(web3);
//       }
//   });
// export default getWeb3;