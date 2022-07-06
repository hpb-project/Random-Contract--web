 import {
     getChainsList
 } from "../utils/getLocal.js";

 // 防抖函数
 function debounce(fn, wait) {
     let t
     return () => {
         let context = this
         let args = arguments
         if (t) clearTimeout(t)
         t = setTimeout(() => {
             fn.apply(context, args)
         }, wait)
     }
 }

 function flatten(arr) { // 数组扁平化
     return arr.reduce((result, item) => {
         return result.concat(Array.isArray(item) ? flatten(item) : item)
     }, [])
 }

 function handleMulitePerson(sPerson) {
     console.log(44, sPerson.split(','))
     if (typeof sPerson == 'string') {
         let personArr = []
         sPerson.split(',').forEach(item => {
             let obj = {
                 userCode: item.split('/')[0],
                 userName: item.split('/')[1]
             }
             personArr.push(obj)
         })
         return personArr
     }
 }

 function uniqueArray(array, key) { // json数组根据key去重
     var result = [array[0]]
     for (var i = 1; i < array.length; i++) {
         var item = array[i]
         var repeat = false
         for (var j = 0; j < result.length; j++) {
             if (item[key] == result[j][key]) {
                 repeat = true
                 break
             }
         }
         if (!repeat) {
             result.push(item)
         }
     }
     return result
 }

 function setSessionStorage(key, val) {
     if (typeof (val) == 'object') {
         sessionStorage.setItem(key, JSON.stringify(val))
     } else {
         sessionStorage.setItem(key, val)
     }
 }

 function getSessionStorage(key) {
     return sessionStorage.getItem(key)
 }

 function removeStorage(key) {
     sessionStorage.removeItem(key)
 }

 function urlParams() { // 获取链接参数
     var str = location.search.length > 0 ? location.search.substring(1) : ''
     var items = str.length ? str.split('&') : []
     var args = {}
     var item = null
     var name = null
     var value = null
     for (let i = 0, len = items.length; i < len; i++) {
         item = items[i].split('=')
         name = decodeURIComponent(item[0])
         value = decodeURIComponent(item[1])
         if (name.length) {
             args[name] = value
         }
     };
     return args
 }

 function urlAfterParams() {
     var str = window.location.hash.length > 0 ? window.location.hash.substring(window.location.hash.indexOf('?') + 1) : ''
     var items = str.indexOf('&') > 0 ? str.split('&') : str.split('?')
     var args = {}
     var item = null
     var name = null
     var value = null
     for (let i = 0, len = items.length; i < len; i++) {
         item = items[i].split('=')
         name = decodeURIComponent(item[0])
         value = decodeURIComponent(item[1])
         if (name.length) {
             args[name] = value
         }
     };
     return args
 }

 function parseParams(url) {
     url = decodeURIComponent(url)
     var params = {}
     var idx = url.indexOf('?')
     if (idx > 0) {
         var queryStr = url.substring(idx + 1)
         if (queryStr.length > 0) {
             var arr = queryStr.split('&')
             for (let i = 0; i < arr.length; i++) {
                 var pair = arr[i].split('=')
                 if (pair.length == 2 && pair[0].length > 0) {
                     params[pair[0]] = pair[1]
                 }
             }
         }
     }
     return params
 }
  
 function initPage() {

     
 }

 function setMenu() {
      

 }
 
  

 function getUrlParams(dParam) {
     var dPageURL = window.location.search.substring(1),
         dURLVariables = dPageURL.split('&'),
         dParameterName,
         i;

     for (i = 0; i < dURLVariables.length; i++) {
         dParameterName = dURLVariables[i].split('=');

         if (dParameterName[0] === dParam) {
             return dParameterName[1] === undefined ? true : decodeURIComponent(dParameterName[1]);
         }
     }
 }

 function connectWallet(callback) {

    let local = localStorage.getItem('languageSet')

     if (typeof window.ethereum === "undefined") {
        
        if(local =='en'){
            alert('Please install MetaMask.' )
        }else{
            alert("请安装MetaMask!");
        }
        
     } else {
        window.ethereum.request({
                 method: "eth_requestAccounts"
             })
             .catch(function (reason) {
                 alert(reason.message);
             })
             .then(function (accounts) {
                 //你也可以验证用户接入了正确的网络
                 // if (ethereum.networkVersion !== desiredNetwork) {
                 //     alert("This application requires the main network, please switch it in your MetaMask UI.");
                 // } 
                 let chainId = window.ethereum.chainId;
                 if (chainId && chainId.length > 0) {
                     let chId = parseInt(chainId, 16);
                     let chainList = getChainsList();
                     chainId = chainList.filter((p) => {
                         return p.chainId == chId;
                     });
                     if (chainId.length > 0) {
                         chainId = chainId[0];
                     }

                 }

                 callback(accounts[0], chainId);
             });
     }
 }

 //给钱包添加自定义网络
 function addNetWork() { 
     window.ethereum
         .request({
             "id": 1,
             "jsonrpc": "2.0",
             "method": "wallet_addEthereumChain",
             "params": [{
                 "chainId": "0x10d",
                 "chainName": "HPB Main",
                 "rpcUrls": ["https://hpbnode.com"],
                 "blockExplorerUrls": ["https://hpbscan.org"],
                 "nativeCurrency": {
                     "name": "High Performance Blockchain",
                     "symbol": "HPB",
                     "decimals": 18
                 }
             }]
         })
         .then(() => {
             console.log('网络切换成功')
         })
         .catch((e) => {

         })



 }


 async function switchAsync() {

     if (typeof window.ethereum === "undefined") {
         alert("请安装MetaMask!");
         return;
     } 
     let hpbTestnet = {
         chainId: "0x10d",
         chainName: "HPB Mainnet",
         rpcUrls: ["https://hpbnode.com"], //http://114.242.26.15:8006
         blockExplorerUrls: ["https://hpbscan.org"],
         nativeCurrency: {
             name: "High Performance Blockchain Ether",
             symbol: "HPB",
             decimals: 18
         }
     };
     switchChain(hpbTestnet);
 }
 async function addChain(data) {
     try {
         await ethereum.request({
             "id": 1,
             "jsonrpc": "2.0",
             "method": "wallet_addEthereumChain",
             params: [data],
         });
     } catch (addError) {
         console.log(addError)
         // handle "add" error
     }
 }
 async function switchChain(data) {
     try {
         let {
             chainId
         } = data;
         await ethereum.request({
             method: 'wallet_switchEthereumChain',
             params: [{
                 chainId
             }],
         });
     } catch (switchError) {
         // This error code indicates that the chain has not been added to MetaMask.
         console.log(switchError)
         if (switchError.code === 4902) {
             addChain(data);
         }
         // handle other "switch" errors
     }
 }

 async function getWallet(callback) {
 
     let account = "";
     console.log('ethereum',ethereum)
     if (ethereum) {
        let {selectedAddress,chainId} =  ethereum 
        if (!selectedAddress) {
            const accounts = await ethereum.enable();  
            console.log('accounts',accounts)
        } 
        selectedAddress =ethereum.selectedAddress 
        chainId =ethereum.chainId 
        console.log('selectedAddress---',selectedAddress)
         if (selectedAddress) {
             account = selectedAddress ;//ethereum._state.accounts[0];
             if (account) {  
                 if (chainId && chainId.length > 0) {
                     let chId = parseInt(chainId, 16);
                     let chainList = getChainsList();
                     chainId = chainList.filter((p) => {
                         return p.chainId == chId;
                     });
                 }

                 callback(account, chainId);
                 return;
             }
         }
     }
     callback(account); 

 }
 //metamask监听事件
 function addMetaMaskListener() {
     if (typeof window.ethereum === "undefined") {
         return;
     }
     //监听网络切换 
     ethereum.on('chainChanged', function (chainId) {
         console.log('metamask chainChanged ' + networkIDstring);
     });

     //监听账号切换
     ethereum.on('accountsChanged', function (accounts) {

         console.log('metamask accountsChanged ' + accounts);
     })

 }
 //移除监听事件
 function removeMetaMaskListener() {
     if (typeof window.ethereum === "undefined") {
         return;
     }
     ethereum.removeListener("chainChanged", function (chainId) {
         console.log('chainChanged  ' + chainId);
     });

     ethereum.removeListener("accountsChanged", function (networkIDstring) {
         console.log('removeListener  ');
     });
 }

 function getMetaBalance(account, callback) {
     if (!account) {
         callback("")
         return;
     }
     // 返回指定地址账户的余额
     ethereum.request({
             method: 'eth_getBalance',
             params: [account, "latest"],
             "id": 1
         })
         .catch(function (reason) {
             alert(reason);
         })
         .then(function (result) {
             callback(result);
             // console.log(result,2)
         });
 }

 

 function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

//提示消息
function toastMsgSuccess(mainTitle,subTitle,position){
    //This Is Success Message  Top Center toast-top-center
   toastr.success(subTitle,mainTitle , {
       positionClass: position,
       timeOut: 5000,
       closeButton: true,
       debug: false,
       newestOnTop: false,
       progressBar: false,
       preventDuplicates: !0,
       onclick: null,
       showDuration: "300",
       hideDuration: "1000",
       extendedTimeOut: "1000",
       showEasing: "swing",
       hideEasing: "linear",
       showMethod: "fadeIn",
       hideMethod: "fadeOut",
       tapToDismiss: !1
   });
} 
function toastMsgWarn(mainTitle,subTitle,position){
   //This Is Success Message  Top Center toast-top-center
  toastr.warning(subTitle,mainTitle, {
      positionClass: position,
      timeOut: 5000,
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      preventDuplicates: !0,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
      tapToDismiss: !1
  });
} 

function toastMsgError(mainTitle,subTitle,position){
    //This Is Success Message  Top Center toast-top-center
   toastr.error(subTitle,mainTitle, {
       positionClass: position,
       timeOut: 5000,
       closeButton: true,
       debug: false,
       newestOnTop: !0,
       progressBar: false,
       preventDuplicates: !0,
       onclick: null,
       showDuration: "300",
       hideDuration: "1000",
       extendedTimeOut: "1000",
       showEasing: "swing",
       hideEasing: "linear",
       showMethod: "fadeIn",
       hideMethod: "fadeOut",
       tapToDismiss: !1
   });
}
function toastShowWait(mainTitle,subTitle,position){
   toastr.success(subTitle,mainTitle , {
       positionClass: position,
       timeOut: 600000,
       closeButton: true,
       debug: false,
       newestOnTop: false,
       progressBar: false,
       preventDuplicates: !0,
       onclick: null,
       showDuration: "300",
       hideDuration: "1000",
       extendedTimeOut: "1000",
       showEasing: "swing",
       hideEasing: "linear",
       showMethod: "fadeIn",
       hideMethod: "fadeOut",
       tapToDismiss: !1
   });
}
function toastClear(){
   toastr.clear();
}
 
export default {
    addNetWork,
    toastMsgSuccess,
    toastMsgWarn,
    toastMsgError,
    toastShowWait,
    toastClear,
    dateFormat,
    initPage,
    setMenu,
    getUrlParams,
    connectWallet,
    switchAsync,
    getWallet,
    addMetaMaskListener,
    removeMetaMaskListener,
    getMetaBalance,
    setSessionStorage,
    urlParams,
    urlAfterParams,
    parseParams,
    debounce,
    handleMulitePerson,
    uniqueArray,
    flatten,
    getSessionStorage,
    removeStorage
}