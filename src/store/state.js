let state = {
    web3: {
        accountAddress: null,
        chainId:null, 
        chain:null, 
        chainName:null, 
        accountBalance:null, 
        isConnected :false,
    },
    //是否有交易
    isTransaction:false,
    //当前交易数量
    transactionCount:0,
    web3Instance:null,
    contractInstance: null,
}
export default state