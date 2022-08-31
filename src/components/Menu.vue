<template>
        <!--  BEGIN TOPBAR  -->
    <div class="topbar-nav header navbar" role="banner">
        <nav id="topbar">
            <ul class="navbar-nav theme-brand flex-row  text-center">
                <li class="nav-item theme-logo">
                     <router-link to="/"  >
                        <img src="assets/img/logo.svg" class="navbar-logo" alt="logo">
                     </router-link>
                    <!-- <a href="/">
                        <img src="assets/img/logo.svg" class="navbar-logo" alt="logo">
                    </a> -->
                </li>
                <li class="nav-item theme-text">
                    <router-link to="/"  >
                        HPB Random Contract
                     </router-link>
                    <!-- <a href="/" class="nav-link"> HPB Random Contract </a> -->
                </li>
            </ul>

            <ul class="list-unstyled menu-categories" id="topAccordion">

                <li class="menu single-menu ">
                    <router-link class="dropdown-toggle autodroprown" active-class="active" exact  to="/" >
                        <div class=""> 
                            <span>{{$t("common.topMenu.home") }}</span>
                        </div>      
                    </router-link> 
                </li>
             
                  <li class="menu single-menu"  v-show="IsConnected"   > 
                     <router-link class="dropdown-toggle autodroprown"  active-class="active" to="/mysubmit" >
                        <div class=""> 
                             <span>{{$t("common.topMenu.submit") }}</span>
                        </div>      
                    </router-link> 
                </li> 
                <li class="menu single-menu" v-show="IsConnected"   > 
                     <router-link class="dropdown-toggle autodroprown"  active-class="active"  to="/purchase" >
                        <div class=""> 
                             <span>{{$t("common.topMenu.purchase") }}</span>
                        </div>      
                    </router-link> 
                </li> 
                <li class="menu single-menu" v-show="IsConnected"  > 
                     <router-link class="dropdown-toggle autodroprown" active-class="active"   to="/mybalance" >
                        <div class=""> 
                             <span>{{$t("common.topMenu.balance") }}</span>
                        </div>      
                    </router-link> 
                </li>
                 <li class="menu single-menu"   > 
                     <router-link class="dropdown-toggle autodroprown" active-class="active"   to="/document" >
                        <div class=""> 
                             <span>{{$t("common.topMenu.document") }}</span>
                        </div>      
                    </router-link>
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
    // const path = that.$route.path;
    // if(path ==='/' || path.includes('/home')){
    //     that.activePath = '/';
    // }else if(path.includes('/document')){
    //     that.activePath = 'document';
    // } else if(path.includes('/purchase')){
    //     that.activePath = 'purchase';
    // } else if(path.includes('/mysubmit')){
    //     that.activePath = 'mysubmit';
    // }else if(path.includes('/mybalance')){
    //     that.activePath = 'mybalance';
    // }
     
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
  } 
};
</script>