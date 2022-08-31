<template>
  <div id="container">
    <!-- BEGIN LOADER -->
    <!-- <div id="load_screen">
      <div class="loader">
        <div class="loader-content">
          <div class="spinner-grow align-self-center"></div>
        </div>
      </div>
    </div>  -->
    <!--  END LOADER --> 
    <!--  BEGIN MAIN CONTAINER  -->
    <NavHeader></NavHeader>
    <div class="main-container" id="container">
      <div class="overlay"></div>
      <div class="search-overlay"></div> 
      <Menu />
      <router-view></router-view> 
    </div>
     
  </div>
</template>

<script>
  
import NavHeader from "../components/NavHeader.vue";
import Menu from "../components/Menu.vue";
import Util from "../utils/custom";   
import {getChainsList} from "../utils/getLocal.js";
export default {
  name: "BasicLayout",
  components: {
    NavHeader, 
    Menu
  }, 
  computed:{
     IsConnected(){ 
       return this.$store.state.web3.isConnected;
    },
  },
  beforeCreate(){//连接钱包
      var that = this; 
      if(!that.IsConnected && web3.currentProvider.selectedAddress) {         
        Util.connectWallet((res, chain) => {  
          console.log('--------------2' + new Date())
          that.$store.dispatch("metaMaskAccount", res);
          that.$store.dispatch("metaMaskChainId", chain); 
          that.$store.dispatch("metaMaskConnected", true);   
        }); 
      }
  },
  mounted() {
    //metamask 监听网络切换
      const that = this
      ethereum.on('chainChanged', function (chainId) {      
        if(chainId && chainId.length >0){ 
          let chId = parseInt(chainId, 16); 
          let chainList = getChainsList();
          var boeData = chainList.filter((p) => {
              return p.chainId == chId;
          });
          if(boeData.length >0){
            that.$store.dispatch('metaMaskChainId',boeData[0])
            console.log('metamask chainChanged ' + boeData[0]);
          }else{
              that.$store.dispatch('metaMaskChainId',parseInt(chainId, 16))
              console.log('metamask chainChanged ' + chainId);
          } 
        } 
      });
      
      ethereum.on('accountsChanged', function (accounts) {    
          that.$store.dispatch('metaMaskAccount',accounts[0])
          console.log('metamask accountsChanged ' + accounts);
      });
      this.$nextTick(() => {
        //元素加载完成后执行的代码
        window.addEventListener("load", function () {
            setTimeout(() => {
              var load_screen = document.getElementById("load_screen");
              document.getElementById("container").removeChild(load_screen);
            }, 2000);
        
        });
        $(document).ready(function() {
              App.init();
        });     
      });

  },
  beforeDestroy() {  // 实例销毁之前对点击事件进行解绑
    // ethereum.removeAll
     Util.removeMetaMaskListener();
  },

};
</script>
 