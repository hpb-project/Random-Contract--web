<template>     
    <!--  BEGIN NAVBAR  -->
    <div class="header-container">
        <header class="header navbar navbar-expand-sm">

            <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
                    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </a>
            <div class="nav-logo align-self-center">
                <a class="navbar-brand" href="/"><img alt="logo" src="assets/img/logo.svg"> 
                    <span class="navbar-brand-name" style="margin-left:10px;">{{ $t('common.navHeader.title') }}</span>
                </a>
            </div>

            <ul class="navbar-item flex-row mr-auto">
                
            </ul>

            <ul class="navbar-item flex-row nav-dropdowns">
                
                 <li  v-show="IsConnected"  class="nav-item  " >
                    <a  href="javascript:void(0);" class="btn btn-dark  mb-2   mt-3"   > 
                        <img class="bg-img" src="assets/img/amount.svg" alt="" width="20px" /> 
                        <span class="ml-1">{{ ChainId }}</span >                      
                        <span class="ml-1">{{ AccountBalance }} {{Chain}}</span >
                    </a> 
                </li>

                <li class="nav-item ">
                    <a href="javascript:void(0);" v-show="!IsConnected" class="btn btn-dark  mb-2  mt-3" v-on:click="connectWallet">
                        <img class="bg-img" src="assets/img/wallet_new.svg" width="20px" alt="" />  
                        <span class="ml-1" v-show="!IsConnected" >{{ $t('common.navHeader.connectWallet') }}</span > 
                    </a>
                    <a href="javascript:void(0);" v-show="IsConnected" class="btn btn-dark  mb-2 ml-1  mt-3" v-clipboard:copy="AccountAddress" v-clipboard:success="onCopy" v-clipboard:error="onError">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                          <span class="ml-1" v-show="IsConnected" :title="AccountAddress"  >
                              {{accountAddressHide}}
                          </span >
                          <input type="hidden" id="wallet_address" />
                    </a> 
                    <a href="javascript:void(0);" v-show="IsConnected" class="btn btn-dark ml-1  mb-2  mt-3"> 
                        <span class="ml-1" >{{heightBlock}} Block</span > 
                    </a>
                </li>
    
                <li class="nav-item dropdown ml-1">
                  <a href="javascript:void(0);" class="btn btn-dark  mb-2 mt-3"  v-on:click="switchHpbNetWork" > 
                        <svg t="1653264992107" class="icon" viewBox="0 0 1028 1024" version="1.1" 
                        xmlns="http://www.w3.org/2000/svg" p-id="3920" width="128" height="128">
                        <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#E6E6E6" p-id="3921"></path>
                        <path d="M557.3536 410.464l47.6928-113.0112 210.2112-78.5376z" fill="#E2761B" p-id="3922"></path>
                        <path d="M475.7056 412.2784l-45.36-114.8256-210.4704-78.5376zM722.464 662.9248l-68.688 105.2352 146.9664 40.4352 42.2496-143.3376zM192.6592 665.2576l41.9904 143.3376 146.9664-40.4352-68.688-105.2352z" fill="#E4761B" p-id="3923"></path><path d="M373.3216 485.1136l-40.9536 61.9488 145.9296 6.48-5.184-156.816zM661.8112 485.1136l-101.088-90.2016-3.3696 158.6304 145.6704-6.48zM469.2256 725.392l-75.6864-59.0976-11.9232 101.8656zM653.776 768.16l-12.1824-101.8656-75.6864 59.0976z" fill="#E4761B" p-id="3924"></path><path d="M653.776 768.16l-87.8688-42.768 6.9984 57.2832-0.7776 24.1056zM381.616 768.16l81.648 38.6208-0.5184-24.1056 6.48-57.2832z" fill="#D7C1B3" p-id="3925"></path><path d="M391.4656 606.9376l51.5808-23.5872 21.5136 45.1008zM592.0864 583.3504l51.84 23.5872-73.3536 21.5136z" fill="#233447" p-id="3926"></path><path d="M394.0576 662.9248l-81.1296 2.3328 68.688 102.9024zM653.776 768.16l68.688-102.9024-81.1296-2.3328zM592.3456 583.3504l51.84 23.5872 58.8384-59.8752-145.6704 6.48 13.4784 74.9088zM478.2976 553.5424l-145.9296-6.48 59.0976 59.8752 51.84-23.5872 21.2544 45.1008z" fill="#CD6116" p-id="3927"></path><path d="M393.5392 666.2944l-2.0736-59.3568-59.0976-59.8752zM641.5936 666.2944l61.4304-119.232-58.8384 59.8752zM478.2976 553.5424l-13.7376 74.9088 17.1072 88.3872 3.888-116.3808zM557.3536 553.5424l-6.9984 46.656 3.1104 116.64 17.3664-88.3872z" fill="#E4751F" p-id="3928"></path><path d="M641.5936 666.2944l2.592-59.3568-73.3536 21.5136-17.3664 88.3872 12.4416 8.5536zM481.6672 716.8384l-17.1072-88.3872-73.0944-21.5136 2.0736 59.3568 75.6864 59.0976z" fill="#F6851B" p-id="3929"></path><path d="M462.7456 782.6752l0.5184 24.1056-81.648-38.6208 28.512 23.328 57.8016 40.176h99.2736l58.0608-40.176 28.512-23.328-81.648 38.6208 0.7776-24.1056-6.48-5.7024h-97.7184z" fill="#C0AD9E" p-id="3930"></path><path d="M462.7456 782.6752l5.9616-5.7024h97.7184l6.48 5.7024-6.9984-57.2832-12.4416-8.5536h-71.7984l-12.4416 8.5536z" fill="#161616" p-id="3931"></path><path d="M827.44 489.7792l-12.96-9.3312 20.736-18.9216-16.0704-12.4416 20.736-15.8112-13.7376-10.368 22.032-105.7536-32.9184-98.2368-249.3504 185.0688 95.904 81.1296 135.5616 39.6576zM207.952 489.7792l29.808 34.992 135.5616-39.6576 95.904-81.1296-249.3504-185.0688L187.216 317.152l22.032 105.7536-13.9968 10.368 20.736 15.8112-15.8112 12.4416 20.736 18.9216z" fill="#763D16" p-id="3932"></path><path d="M722.464 665.2576h120.528l-45.6192-140.4864-135.5616-39.6576 41.2128 61.9488-61.4304 119.232zM393.5392 666.2944l-61.1712-119.232 40.9536-61.9488L237.76 524.7712l-45.1008 140.4864H312.928zM553.4656 716.8384l0.5184-116.1216 3.3696-47.1744 8.5536-149.5584 39.3984-106.5312h-174.96l38.88 106.5312 9.072 149.5584 3.1104 47.1744 0.2592 116.1216z" fill="#F6851B" p-id="3933"></path></svg>
                         <span class="ml-1"> {{ $t('common.navHeader.swithHpbNetWork') }}</span >  
                  </a> 
                </li>
                <li class="nav-item dropdown language-dropdown more-dropdown  mt-2">
                    <div class="dropdown custom-dropdown-icon">
                        <a class="dropdown-toggle" href="#" role="button" id="customDropdown" data-toggle="dropdown" 
                            aria-haspopup="true" aria-expanded="false">
                            <img :src="getLangIcon" class="flag-width" alt="flag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                            class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right animated fadeInUp" aria-labelledby="customDropdown">
                            <a class="dropdown-item" data-img-value="zh" data-value="zh" href="javascript:void(0);" 
                             @click="changeLanguage('zh')" ><img src="assets/img/zh.png" class="flag-width" alt="flag">中文</a>
                            <a class="dropdown-item" data-img-value="en" data-value="en" href="javascript:void(0);" 
                             @click="changeLanguage('en')" ><img src="assets/img/en.png" class="flag-width" alt="flag">English</a>
                        </div>
                    </div>
                </li>
            </ul>
        </header>
    </div>
    <!--  END NAVBAR  -->
</template>

<script> 
import Util from "../utils/custom";  
export default {
  name: "NavHeader",  
  data(){
    return {
        // 定时器
      timer: null,
      accountAddressHide:'',
      heightBlock:''
    }
  },
  computed:{
    getLangIcon(){ 
        return "assets/img/"+ this.$i18n.locale+".png";
    },
    IsConnected(){ 
       return this.$store.state.web3.isConnected;
    },
    //账户地址
    AccountAddress() {
      return this.$store.state.web3.accountAddress;
    },  
   //链Id
    ChainId() {
      if(this.$store.state.web3.chainName==null){
        return "";
      }else{
        return this.$store.state.web3.chainName;
      } 
    },  
    //链名称
    Chain(){
       return this.$store.state.web3.chain;
    },
    //账户余额
    AccountBalance() {
      if(this.$store.state.web3.accountBalance==null){
        return "0 HPB";
      }else{
        let balance = this.$store.state.web3.accountBalance;
        if(balance){
          balance =  new Number(balance);
          balance = balance.toFixed(3);
        }
        return balance;
      } 
    },
  },
  methods:{
      // 获取最新的块高度 
    startHeightBlock(){      
      const that = this
      if (that.timer) {
        clearInterval(that.timer)
      }else{
        that.timer = setInterval(() => {
          that.$web3.eth.getBlockNumber()
            .then((result)=>{
              that.heightBlock = result 
            })

        }, 3000);
      }
    },
    changeLanguage(val){
      this.$i18n.locale = val;   //设置中英文模式
      localStorage.setItem('languageSet',this.$i18n.locale)   //将用户设置存储到localStorage以便用户下次打开时使用此设置
    },
       // 复制成功
    onCopy(e){   
        Util.toastMsgWarn(this.$t("common.navHeader.msgTip1"),this.$t("common.navHeader.msgTip2"),"toast-top-center")
    },
    // 复制失败
    onError(e){  
        Util.toastMsgError(this.$t("common.navHeader.msgTip1"),this.$t("common.navHeader.msgTip3"),"toast-top-center")
    },

    changeLeftMenu(){   
      this.isActive = !(this.isActive); 
      this.$emit("changeNavHeader")
    }, 
    //连接钱包
    connectWallet: function () {
      var that = this; 
      console.log('--------------1')
      Util.connectWallet((res, chain) => {  
        that.$store.dispatch("metaMaskAccount", res);
        that.$store.dispatch("metaMaskChainId", chain); 
        that.$store.dispatch("metaMaskConnected", true);  
      }); 
    },
    switchHpbNetWork:function(){
      Util.switchAsync();
    },
    //账户改变
    accountChange(value) {      
      const that  = this;
      let accountAddr = value;
      if (accountAddr != null) {
        that.getAccountBalance(accountAddr); 
        that.accountAddressHide =  accountAddr.substring(0, 6) +"......" + accountAddr.substring(accountAddr.length - 6, accountAddr.length);
        that.$store.dispatch("metaMaskConnected", true); 
      }else{ 
        that.$store.dispatch("metaMaskConnected", false); 
      }
    },
    //获取余额
    getAccountBalance(value){
       const that = this;
        Util.getMetaBalance(value,function(result){ 
          const hexBalance = that.$web3.utils.toBN(result).toString();
          const balance= that.$web3.utils.fromWei(hexBalance,'ether');
          that.$store.dispatch("metaMaskBalance", balance);
        });
    }


  },
  mounted(){  
    // if(!this.IsConnected && web3.currentProvider.selectedAddress) { 
    //    this.connectWallet();
    // }
    this.startHeightBlock()
  },

  beforeDestroy(){
    clearInterval(this.timer)
    this.timer = null
  },
  watch: {
    //监听wallet
    AccountAddress: {
      immediate: false,
      handler: function (newval) { 
        this.accountChange(newval);
      },
    },
    ChainId:{
      immediate: true,
      handler: function (newval) {      
         let account = this.$store.state.web3.accountAddress;
         if(account){
            this.getAccountBalance(account); 
         }
      },
    } 
  },
};
</script>

 