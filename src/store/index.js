import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'; 

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    metaMaskAccountInstance(state, data) {
      let web3Copy = state.web3;
      web3Copy.accountAddress = data;
      state.web3 = web3Copy 
    },
    metaMaskChainIdInstance(state, data) {
      let web3Copy = state.web3; 
      if(!data){
        data.chain = "HPB";
        data.chainId = 269;
        data.network = "mainnet";
      }
      web3Copy.chainId = data.chainId;
      web3Copy.chainName = data.chain +" " + data.network  ;
      web3Copy.chain = data.chain;
      state.web3 = web3Copy 
    }, 
    metaMaskBalanceInstance(state, data) {
      let web3Copy = state.web3;
      web3Copy.accountBalance = data;
      state.web3 = web3Copy 
    },  
    
    metaMaskConnectedInstance(state, data) { 
      console.log('metaMaskConnectedInstance...',data)
      let web3Copy = state.web3;
      web3Copy.isConnected = data;
      state.web3 = web3Copy 
    },   
    
    transactionAddInstance(state,data) {     
      let transactionCountCopy = state.transactionCount;
      transactionCountCopy = transactionCountCopy  + data;
      state.transactionCount = transactionCountCopy 
      console.log("transactionAddInstance", state.transactionCount)
    },   
    
    transactionSubInstance(state,data) {
      let transactionCountCopy = state.transactionCount;
      transactionCountCopy = transactionCountCopy  - data; 
      state.transactionCount = transactionCountCopy 
      console.log("transactionSubInstance", state.transactionCount)

    },
  },
  actions: {

    metaMaskAccount({commit},values){
      commit('metaMaskAccountInstance', values)
    },
    
    metaMaskChainId({commit},values){
      commit('metaMaskChainIdInstance', values)
    },
    metaMaskBalance({commit},values){
      commit('metaMaskBalanceInstance', values)
    },   
    
    metaMaskConnected({commit},values){
      commit('metaMaskConnectedInstance', values)
    },
    //交易增加数量
    transactionAdd({commit},values){ 
      console.log("transactionAdd")
      commit('transactionAddInstance', values)
    },   
    //交易减少数量
    transactionSub({commit},values){
      console.log("transactionSub")
      commit('transactionSubInstance', values)
    },  
  },
  modules: {},
})

 