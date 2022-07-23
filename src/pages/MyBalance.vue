<template lang="">
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="row layout-top-spacing"> 
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="widget widget-chart-three">
                        <div class="widget-heading"> 
                            <h5 class="" style="line-height:37px">
                              {{$t("myBalance.pageName")}}
                            </h5>                             
                        </div>                        
                    </div>

                    <div class="statbox widget box box-shadow">                      
                      <div class="widget-header">
                        <div class="row">
                            <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                                  <h4>
                                    {{$t("myBalance.Title")}}
                                     <!-- <span style="color: #888ea8;font-size: 0.875rem;">&nbsp;&nbsp; {{$t("myBalance.desc")}}</span>    -->
                                  </h4> 
                            </div>
                        </div>
                      </div>
                      <div class="widget-content widget-content-area">  
                          <div class="form-group row  mb-4">
                              <label for="curBalance" class="col-sm-3 col-form-label col-form-label-sm">{{$t("myBalance.curBalance")}}</label>
                              <div class="col-sm-9">
                                  <input type="text" class="form-control form-control-sm" id="curBalance" v-model="HRGBalance" 
                                  disabled="disabled" readonly="readonly" >
                              </div>
                          </div>  
                          <div class="form-group row  mb-4">
                              <label for="address" class="col-sm-3 col-form-label col-form-label-sm">{{$t("myBalance.address")}}</label>
                              <div class="col-sm-9">
                                  <input type="text" class="form-control form-control-sm" id="address"v-model="tokenAddress" placeholder="address...0x">
                              </div>
                          </div> 
                          
                            <button  class="btn btn-primary" name="btnSubmit" :disabled="btnDisabled"   @click="handlerSubmit" >{{$t("myBalance.submitButton")}}</button> 
                          
                          <div class="form-group row  mt-4">
                           <label  class="col-12 col-form-label col-form-label-sm">
                             {{$t("myBalance.desc")}}
                             <br>
                             {{$t("myBalance.desc2")}}
                           </label>
                          </div> 
                      </div>
                     
                    </div>

                </div>
            </div>  
        </div> 


        <Footer></Footer> 
    </div>
</template>
<script>
import Footer from "../components/Footer.vue";
import utils from "../utils/custom";
import { getToken } from "../api/facuetApi";
import {tokenAbiContract} from '../utils/getContract'
export default {
  name: "MyBalance",
  components: { Footer },
  data() {
    return {
      accountAddress: "",
      tokenAddress:"",
      HRGBalance:0,
      btnDisabled:false,
    };
  },
  computed: {
    getLanguage() {
      return this.$i18n.locale;
    },
        //账户地址
    AccountAddress() {
      return this.$store.state.web3.accountAddress;
    }, 
  },
  async mounted() {
      var that = this; 
      if(!that.IsConnected && web3.currentProvider.selectedAddress) {     
          that.accountAddress = web3.currentProvider.selectedAddress
      }
      that.tokenAddress = that.accountAddress;
      that.getTokenBalance();
  },
  methods: { 
      getTokenBalance(){
          var that = this; 
          tokenAbiContract.methods.balanceOf(that.accountAddress).call(null,function(err,result){ 
            if(err !==null){
                that.HRGBalance =0;
            }else{ 
                that.HRGBalance = that.$web3.utils.fromWei(result,'ether');
            }
          });
      },
      handlerSubmit(){
        var that = this;        
        that.btnDisabled = true;
        if (!that.tokenAddress.startsWith('0x') || that.tokenAddress.length != 42) {      
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip19"),"toast-top-center")
              that.btnDisabled =false;
              return ;
        } 
        utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip10"), "toast-top-center");
        let parameter = {"network":"mainnet", "to":that.tokenAddress} ; 
        getToken(parameter).then(function(result){
              utils.toastClear();
              that.btnDisabled = false;   
              if(result.error==='200'){
                // that.getTokenBalance(); 
                const sucHtml = '<br> <a href="https://hscan.org/tx/'+result.data+'" target="_blank">'+that.$t("common.commonTips.msgTip20") +'</a>';
                utils.toastMsgSuccess(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6") + sucHtml, "toast-top-center")
              }else{

                utils.toastMsgError(that.$t("common.commonTips.msgTip4"),  that.$t("common.commonTips.msgTip7")+ ','+ result.err_msg ,   "toast-top-center");
              } 
          }).catch(err=>{
              that.btnDisabled = false;
              utils.toastClear();  
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip7")+ err.toString(), "toast-top-center");
              console.log(err);
          });  


      }

  },
  watch: {
    //监听wallet
    AccountAddress: {
      immediate: false,
      handler: function (newval) {
        const that = this;
        that.accountAddress = newval;
        that.tokenAddress = newval;
        that.getTokenBalance();
      },
    }
  },
};
</script>
<style  >
</style>