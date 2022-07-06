<template>
        <!--  BEGIN TOPBAR  -->
    <div class="topbar-nav header navbar" role="banner">
        <nav id="topbar">
            <ul class="navbar-nav theme-brand flex-row  text-center">
                <li class="nav-item theme-logo">
                    <a href="/">
                        <img src="assets/img/logo.svg" class="navbar-logo" alt="logo">
                    </a>
                </li>
                <li class="nav-item theme-text">
                    <a href="/" class="nav-link"> HPB Random Contract </a>
                </li>
            </ul>

            <ul class="list-unstyled menu-categories" id="topAccordion">

                <li class="menu single-menu "  :class="{active: '/' === activePath}" >
                    <a href="/"   class="dropdown-toggle autodroprown">
                        <div class=""> 
                            <span>{{$t("common.topMenu.home") }}</span>
                        </div>                        
                    </a>
                </li>
             
                  <li class="menu single-menu"  v-show="IsConnected" :class="{active: 'mysubmit' === activePath}" >
                    <a href="/mysubmit"   class="dropdown-toggle autodroprown">
                        <div class=""> 
                            <span>{{$t("common.topMenu.submit") }}</span>
                        </div> 
                    </a>
                </li> 
                <li class="menu single-menu" v-show="IsConnected" :class="{active: 'purchase' === activePath}" >
                    <a href="/purchase"   class="dropdown-toggle autodroprown">
                        <div class=""> 
                            <span>{{$t("common.topMenu.purchase") }}</span>
                        </div>                            
                    </a>
                </li>
                 <li class="menu single-menu"   :class="{active: 'document' === activePath}">
                    <a href="/document"   class="dropdown-toggle autodroprown">
                        <div class=""> 
                            <span>{{$t("common.topMenu.document") }}</span>
                        </div>                        
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <!--  END TOPBAR  -->
</template>

<script> 
import Util from "../utils/custom";   

export default {
  name: "TopMenu",
  data(){
      return{ 
        activePath:'',
      }
  },
  mounted(){
    const that = this 
    const path = that.$route.path;
    if(path ==='/' || path.includes('/home')){
        that.activePath = '/';
    }else if(path.includes('/document')){
        that.activePath = 'document';
    } else if(path.includes('/purchase')){
        that.activePath = 'purchase';
    } else if(path.includes('/mysubmit')){
        that.activePath = 'mysubmit';
    }
     
    if(!that.IsConnected && web3.currentProvider.selectedAddress) {     
        that.accountAddress = web3.currentProvider.selectedAddress    
        Util.connectWallet((res, chain) => {  
            console.log('--------------4')
            that.$store.dispatch("metaMaskAccount", res);
            that.$store.dispatch("metaMaskChainId", chain); 
            that.$store.dispatch("metaMaskConnected", true);  
        }); 
    }
  },
  computed: { 
    IsConnected() {
      return this.$store.state.web3.isConnected;
    },
    //账户地址
    AccountAddress() {
      return this.$store.state.web3.accountAddress;
    },
  }, 
 
  methods: {
    
 }
};
</script>