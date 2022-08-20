<template lang="">
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="row layout-top-spacing"> 
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="widget widget-chart-three">
                        <div class="widget-heading"> 
                            <h5 class="" style="line-height:37px">
                              {{$t("purchase.pageName")}}
                              <span style="color: #888ea8;font-size: 0.875rem;">&nbsp;&nbsp;{{showMsgTips}}</span>  
                            </h5>
                            <div class="dropdown  custom-dropdown">  
                                <a class="btn btn-outline-danger mr-2"  target="_blank" :href="purchaseUrl">{{$t("purchase.contractbuy")}}</a> 
 
                                <button class="btn btn-outline-info " @click="subscribedRandom">{{$t("purchase.btnSubRandom")}}</button> 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
             <!-- 表格 -->
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 widget widget-chart-three">
                <div class="table-responsive mb-4 mt-1">
                    <table id="purchaseTable" class="table style-3   table-hover"  
                    style="word-break: break-all; word-wrap: break-all;   text-align: center;">
                        <thead>
                            <tr>
                                <th>{{$t("purchase.tabColumns.rowNum")}}</th>
                                <th>{{$t("purchase.tabColumns.OrderBlock")}}</th>
                                <th>{{$t("purchase.tabColumns.ExpiredBlock")}}</th> 
                                <th>{{$t("purchase.tabColumns.Hash")}}</th>
                                <th>{{$t("purchase.tabColumns.State")}}</th>  
                                <th>{{$t("purchase.tabColumns.operator")}}</th>  
                            </tr>
                        </thead>  
                    </table>
                </div> 
            </div>
            <!-- 取消购买 --> 
            <div class="modal fade" id="addTaskModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            <div class="compose-box">
                                <div class="compose-content" id="addTaskModalTitle">
                                    <h5 id="hTitle" class="task-heading">提交种子</h5>                            
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="d-flex mail-to mb-4">
                                                <span id="hLable">Hash Seed</span>
                                                <div class="w-100">
                                                    <textarea  v-model="hashSeed" placeholder="0x" disabled="disabled" class="form-control" rows="2" cols="30"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <!-- <button class="btn" data-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>  --> 
                            <button class="btn btn-info" @click="handlerSubmit" >{{$t("purchase.btnOperator")}}</button> 
                        </div>
                    </div>
                </div>
            </div>
        
            <!-- 订阅 --> 
            <div class="modal fade" id="subscribeTaskModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
                    <div class="modal-content" >
                        <div class="modal-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            <div class="compose-box">
                                <div class="compose-content" id="addTaskModalTitle">
                                    <h5 class="task-heading">{{$t("purchase.hTitle1")}}</h5>     
                                    <div class="statbox widget box box-shadow">
                                      <div class="form-group mb-4">
                                            <label id="hLable1">{{$t("purchase.HLable1")}}</label>     
                                           <div class="input-group mb-4">
                                               <input type="text" ref="inputCommand" :placeholder="$t('purchase.placeHolder')" :disabled="txtdisabled" class="form-control"  v-model="subscribeCommand" >
                                          </div> 
                                          <small   class="form-text text-muted" style="font-size:14px;">{{$t("purchase.commandTips")}}</small>
                                        </div>
                                        <div class="form-group mb-4">
                                            <label>{{$t("purchase.HLable2")}}</label>                                            
                                            <input type="text" placeholder="0x"  class="form-control" :disabled="txtdisabled" v-model="userAddress"  > 
                                        </div>
                                        
                                        <div class="form-group mb-4">
                                            <label id="hLable3">HRG Balance</label>   
                                            <input type="text" v-model="HRGBalance" class="form-control" disabled="disabled" readonly="readonly">                                           
                                        </div>  
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer"> 
                            <button  class="btn btn-info"  :disabled="approveDisabled" @click="handlerApproval" >{{$t("purchase.btnApproval")}}</button>
                            <button  class="btn btn-info"  :disabled="btnDisabled" @click="handlerSubscribe" >{{$t("purchase.btnScribed")}}</button>
                        </div>
                    </div>
                </div>
            </div>   
            <!-- 随机数查看 --> 
            <div class="modal fade" id="randomTaskModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
                    <div class="modal-content" >
                        <div class="modal-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            <div class="compose-box">
                                <div class="compose-content" id="addTaskModalTitle">
                                    <h5 class="task-heading">{{$t("purchase.hTitle2")}}</h5>     
                                    <div class="statbox widget box box-shadow"> 
                                        <div class="form-group mb-4 mt-4"> 
                                            <input type="text" v-model="randomCode" class="form-control" disabled="disabled" readonly="readonly">                                           
                                        </div>  
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">  
                            <button  class="btn btn-info"   @click="handlerClose" >{{$t("purchase.btnClose")}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '../components/Footer.vue';  
import utils from '../utils/custom'; 
import {configAbiContract,oracleAbiContract,oracleaddr,erc20Signed,tokenAbiContract} from '../utils/getContract'
export default {
  name: "PurchasePage",
  components: { Footer },
  data(){
    return {
      purchaseUrl:'https://remix.ethereum.org/?code=Ly8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVApwcmFnbWEgc29saWRpdHkgXjAuOC4wOwoKaW50ZXJmYWNlIElPcmFjbGUgewogICAgZnVuY3Rpb24gcmVxdWVzdFJhbmRvbShhZGRyZXNzLGFkZHJlc3MsYnl0ZXMzMikgZXh0ZXJuYWwgcmV0dXJucyAoYm9vbCk7CiAgICBmdW5jdGlvbiBnZXRSYW5kb20oYnl0ZXMzMikgZXh0ZXJuYWwgdmlldyByZXR1cm5zIChieXRlczMyKTsKfQoKaW50ZXJmYWNlIElFUkMyMCB7CiAgICBmdW5jdGlvbiBkZWNpbWFscygpIGV4dGVybmFsIHZpZXcgcmV0dXJucyAodWludDgpOwogICAgZnVuY3Rpb24gdG90YWxTdXBwbHkoKSBleHRlcm5hbCB2aWV3IHJldHVybnMgKHVpbnQyNTYpOwogICAgZnVuY3Rpb24gYmFsYW5jZU9mKGFkZHJlc3MgYWNjb3VudCkgZXh0ZXJuYWwgdmlldyByZXR1cm5zICh1aW50MjU2KTsKICAgIGZ1bmN0aW9uIHRyYW5zZmVyKGFkZHJlc3MgdG8sIHVpbnQyNTYgYW1vdW50KSBleHRlcm5hbCByZXR1cm5zIChib29sKTsKICAgIGZ1bmN0aW9uIGFsbG93YW5jZShhZGRyZXNzIG93bmVyLCBhZGRyZXNzIHNwZW5kZXIpIGV4dGVybmFsIHZpZXcgcmV0dXJucyAodWludDI1Nik7CiAgICBmdW5jdGlvbiBhcHByb3ZlKGFkZHJlc3Mgc3BlbmRlciwgdWludDI1NiBhbW91bnQpIGV4dGVybmFsIHJldHVybnMgKGJvb2wpOwogICAgZnVuY3Rpb24gdHJhbnNmZXJGcm9tKGFkZHJlc3MgZnJvbSwgYWRkcmVzcyB0bywgdWludDI1NiBhbW91bnQpIGV4dGVybmFsIHJldHVybnMgKGJvb2wpOwp9Cgpjb250cmFjdCBDb21zdW1lckV4YW1wbGUgewogICAgYWRkcmVzcyBwcml2YXRlIF9vd25lcjsKICAgIG1vZGlmaWVyIG9ubHlPd25lcigpIHsKICAgICAgICByZXF1aXJlKF9vd25lciA9PSBtc2cuc2VuZGVyLCAiT3duYWJsZTogY2FsbGVyIGlzIG5vdCB0aGUgb3duZXIiKTsKICAgICAgICBfOwogICAgfQoKICAgIElPcmFjbGUgb3JhY2xlID0gSU9yYWNsZSgweDAzMDFFMGE1NWU0M2NDMzg3NjJiY2Y2YUM0Qzg2RjVGMTRCNDM2RjEpOyAvLyBvcmFjbGUgY29udHJhY3QgYWRkcmVzcwogICAgSUVSQzIwIHRva2VuID0gSUVSQzIwKDB4RDU2OTdmYTkzYjIxQzEyODUyYzYwNWM1YjljMzQ5NTg1ODQzNjQyZSk7ICAvLyBocmcgdG9rZW4gY29udHJhY3QgYWRkcmVzcwoKICAgIGNvbnN0cnVjdG9yKCkgewogICAgICAgICAgICBfb3duZXIgPSBtc2cuc2VuZGVyOwogICAgfQoKICAgIGZ1bmN0aW9uIHNldHRpbmcoYWRkcmVzcyBvcmFjbGVBZGRyLCBhZGRyZXNzIHRva2VuQWRkcikgcHVibGljIG9ubHlPd25lciB7CiAgICAgICAgb3JhY2xlID0gSU9yYWNsZShvcmFjbGVBZGRyKTsKICAgICAgICB0b2tlbiA9IElFUkMyMCh0b2tlbkFkZHIpOwogICAgfQogICAgCiAgICBieXRlczMyIF9yYW5kb207CiAgICBhZGRyZXNzIFtdIHBsYXllcnM7CiAgICBhZGRyZXNzIHdpbmVyOwoKICAgIC8vIGFwcHJvdmUgdG9rZW4gdG8gb3JhY2xlLgogICAgZnVuY3Rpb24gYXBwcm92ZVRva2VuKHVpbnQyNTYgYW1vdW50KSBwdWJsaWMgb25seU93bmVyIHsKICAgICAgICB1aW50OCBkZWMgPSB0b2tlbi5kZWNpbWFscygpOwogICAgICAgIHVpbnQyNTYgdG93ZWkgPSBhbW91bnQgKiAxMCAqKiBkZWM7CiAgICAgICAgcmVxdWlyZSh0b2tlbi5iYWxhbmNlT2YoYWRkcmVzcyh0aGlzKSkgPj0gdG93ZWksICJub3QgZW5vdWdoIHRva2VuIik7CiAgICAgICAgdG9rZW4uYXBwcm92ZShhZGRyZXNzKG9yYWNsZSksIHRvd2VpKTsKICAgIH0KICAgIAogICAgLy8gcmVxdWVzdCBhIHJhbmRvbS4KICAgIGZ1bmN0aW9uIHN0YXJ0TmV3R2FtZSgpIHB1YmxpYyBvbmx5T3duZXIgewogICAgICAgIGJ5dGVzMzIgcmluZ2hhc2ggPSBrZWNjYWsyNTYoYnl0ZXMoInNvbWV0aGluZyIpKTsKICAgICAgICBvcmFjbGUucmVxdWVzdFJhbmRvbShtc2cuc2VuZGVyLCBhZGRyZXNzKHRoaXMpLCByaW5naGFzaCk7CiAgICB9CgogICAgZnVuY3Rpb24gam9pbkdhbWUoKSBwdWJsaWMgewogICAgICAgIHBsYXllcnMucHVzaChtc2cuc2VuZGVyKTsKICAgIH0KCiAgICBmdW5jdGlvbiBlbmRHYW1lKGJ5dGVzMzIgY29tbWl0KSBwdWJsaWMgb25seU93bmVyIHsKICAgICAgICBfcmFuZG9tID0gb3JhY2xlLmdldFJhbmRvbShjb21taXQpOwogICAgICAgIHVpbnQyNTYgX25yYW5kb20gPSB1aW50MjU2KF9yYW5kb20pOwogICAgCiAgICAgICAgcmVxdWlyZShfbnJhbmRvbSAhPSAwLCAibm90IGdvdCByYW5kb20iKTsKICAgICAgICByZXF1aXJlKHBsYXllcnMubGVuZ3RoID4gMCwgImhhdmUgbm8gcGxheWVycyIpOwogICAgICAgIHVpbnQzMiB3aW5lcmlkeCA9IHVpbnQzMihfbnJhbmRvbSUgcGxheWVycy5sZW5ndGgpOwogICAgICAgIHdpbmVyID0gcGxheWVyc1t3aW5lcmlkeF07CgogICAgfQogICAgZnVuY3Rpb24gZ2V0cmFuZG9tKCkgcHVibGljIHZpZXcgb25seU93bmVyIHJldHVybnMgKGJ5dGVzMzIpIHsKICAgICAgICByZXR1cm4gX3JhbmRvbTsKICAgIH0KfQ==',
      accountAddress:'', 
      hashSeed:'',
      table: null,
      purchaseList: [],
      purchaseTableName: "#purchaseTable",
      heighBlock:0,
      unSubBlocks:0,//取消块购买高度
      btnDisabled:true,
      approveDisabled:false,//批准可用
      userAddress:'',//使用者address
      HRGBalance:0, //hrg余额
      subscribeCommand:'',
      lockSubscribeCount:0,//未转换质押数量
      lockSubscribe:0,//转换后质押数量
      txtdisabled:false,
      randomCode:'',//随机数
    }
  },
  computed: {
    showMsgTips(){
      let msg = this.$t("common.commonTips.msgTip18");
      return msg.replaceAll('${block}',this.unSubBlocks)
    },
    getLanguage() {
      return this.$i18n.locale;
    },
    tableLanguage() {
      return {
          sProcessing: this.$t("homePage.tableLanguage.sProcessing"), 
          sZeroRecords: this.$t("homePage.tableLanguage.sZeroRecords"),
          sInfo: this.$t("homePage.tableLanguage.sInfo"),
          sInfoEmpty: this.$t("homePage.tableLanguage.sInfoEmpty"),
          sInfoFiltered: this.$t("homePage.tableLanguage.sInfoFiltered"),
          sInfoPostFix: "",
          sSearch: this.$t("homePage.tableLanguage.sSearch"), 
          sEmptyTable: this.$t("homePage.tableLanguage.sEmptyTable"),
          sLoadingRecords: this.$t("homePage.tableLanguage.sLoadingRecords"),
          sInfoThousands: ",", 
          sLengthMenu:this.$t("homePage.tableLanguage.sLengthMenu"),
          oPaginate: { 
              "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
              "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' },
          
      };
    },
  },
  async mounted() {
      var that = this; 
      if(!that.IsConnected && web3.currentProvider.selectedAddress) {     
          that.accountAddress = web3.currentProvider.selectedAddress    
        //   utils.connectWallet((res, chain) => {  
        //     console.log('--------------4')
        //     that.$store.dispatch("metaMaskAccount", res);
        //     that.$store.dispatch("metaMaskChainId", chain); 
        //     that.$store.dispatch("metaMaskConnected", true);  
        // }); 
      } 

      //余额
       tokenAbiContract.methods.balanceOf(that.accountAddress).call(null,function(err,result){  
         if(err !==null){
            that.HRGBalance =0;
         }else{ 
            that.HRGBalance = that.$web3.utils.fromWei(result,'ether');
         }
      });
      //取消订阅块数间隔
      that.unSubBlocks = await configAbiContract.methods.getUnSubBlocks().call() || 0;

      //购买质押数量
      that.lockSubscribeCount= await configAbiContract.methods.getFee().call()|| 0;
      that.lockSubscribe = that.$web3.utils.fromWei(that.lockSubscribeCount,'ether');
      //当前块高度
      that.heighBlock = await that.$web3.eth.getBlockNumber();
      that.getConsumeList();
   
  },
  methods: {
    //初始化列表
    initTable(dataList){
      var that = this;
      that.table = $(that.purchaseTableName).DataTable({
        autoWidth: false,
        data: dataList,
        retrieve: true,
        bFilter:false,
        bLengthChange:false,
        columns: [
          { widht: "60px", data: "rowNum" },  
          { widht: "120px",data: "Block" },
          { widht: "120px", data: "EndBlock" },
          { widht: "120px", data: "Hash",render: function (data, type, full, meta) {
              let displayText = data;
              if (data.length > 20) {
                displayText =
                  data.substring(0, 10) +
                  "......" +
                  data.substring(data.length - 10);
              }
              var spanTitle = "span" + data;
               $(that.purchaseTableName).undelegate("tbody #" + spanTitle, "click");
                $(that.purchaseTableName).on("click", "tbody #" + spanTitle,
                    function () {
                        that.copyHash(data);
                    }
                ); 

              let html =`<span id=${spanTitle} class="btn-link text-warning" title="${data}" >${displayText}  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path> <polyline points="13 2 13 9 20 9"></polyline></svg> </span>`;
              return html;
            },
          }, 
          { widht: "120px", data: "State", render: function (data, type, full, meta) {
               if(that.getLanguage =='en'){
                  if (data == "1"){                       
                      return '<span class="badge outline-badge-success">Revealed</span>';
                  }else{
                      return '<span class="badge outline-badge-danger">UnRevealed</span>';
                  } 
               }else{
                    if (data == "1") {
                      return '<span class="badge  outline-badge-success">认证完成</span>';
                    } else {
                      return '<span class="badge  outline-badge-danger">未认证</span>';
                    }
               }            
            },
          },
          { widht: "120px",data: "null",render: function (data, type, full, meta) {
              if(full.State ===1){ 
                  var btnToRandom = "btnLookRandom" + full.rowNum;
                  $(that.purchaseTableName).undelegate("tbody #" + btnToRandom, "click");
                  $(that.purchaseTableName).on("click", "tbody #" + btnToRandom,
                    function () {
                        that.LookRandom(full.Hash);
                    }
                  ); 
                  var operator = '<button id='+ btnToRandom +' class="btn btn-info">'+ that.$t("purchase.randomButton") +'</button> ';
                  return operator;

              }else{
                if( that.heighBlock > parseInt(full.Block) + parseInt(that.unSubBlocks)){
                  return ''
                }else{
                  var btnToPurchase = "btnPurchase" + full.rowNum;
                  $(that.purchaseTableName).undelegate("tbody #" + btnToPurchase, "click");
                  $(that.purchaseTableName).on("click", "tbody #" + btnToPurchase,
                    function () {
                        that.CanclePurchase(full.Hash,full.Block);
                    }
                  ); 
                  var operator = '<button id='+ btnToPurchase +' class="btn btn-info">'+ that.$t("purchase.submitButton") +'</button> ';
                  return operator;
                }
              
              }              
            },
          }
        ], 
        oLanguage: that.tableLanguage,
      });
    },
        // 复制成功
    copyHash(hash){   
      this.$copyText(hash);
      utils.toastMsgSuccess(this.$t("common.navHeader.msgTip1"),this.$t("common.navHeader.msgTip2"),"toast-top-center")
    },
     
    //显示订阅随机数页面
    subscribedRandom(){
      const that = this ;
      //确认按钮禁用
      that.btnDisabled =true;
      //批准按钮可以
      that.approveDisabled =false;
      //文字可以编辑
      that.txtdisabled = false ;
      that.userAddress = that.accountAddress; 
      $('#subscribeTaskModal').modal('show') ; 
      // this.$nextTick(() => {  
      //   this.$refs.inputCommand.focus(); 
      // },1000)
    }, 
    controlDiabled(){ 
      this.approveDisabled =false;
      this.txtdisabled = false ;
      this.btnDisabled =true; 
    },
    //批准
    async handlerApproval(){ 
      const that = this 
      const str1 = this.userAddress; 
      that.approveDisabled =true; 
      that.txtdisabled = true ;
      try{ 
        if(that.HRGBalance === '0'){
            utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip16"),"toast-top-center")
            that.controlDiabled();
            return ; 
        } 
        if(parseInt(that.lockSubscribe) >parseInt(that.HRGBalance)){
          that.controlDiabled();
          utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip17"),"toast-top-center")
          return ; 
        }  
        //判断是0x开头
        if(!str1.toLowerCase().match(/^0x/)){ 
          that.controlDiabled();
          utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip19"),"toast-top-center")
          return ;
        } 
      //0x后面40个长度的16进制
        if(!/^[A-Fa-f0-9]{40}$/.test(str1.substring(2))){
          that.controlDiabled();
          utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip19"),"toast-top-center")
          return ;
        }
        if(!that.subscribeCommand){
          that.controlDiabled();
          utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip21"),"toast-top-center")
          return ;
        } 
        let tx = await  erc20Signed.approve(oracleaddr,  that.lockSubscribeCount);        
        //等待approve完成
        utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip10"), "toast-top-center");
        await tx.wait();
        console.log('tx--------->',tx);
        utils.toastClear();  
        //确认按钮可用
        that.btnDisabled =false;
 
      }catch(e){
        that.controlDiabled(); 
        utils.toastClear();
        utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip9") + "," + 
            e.code + "," + e.message, "toast-top-center"); 
        console.log('-------',e) 
      } 
    },
    //订阅随机数
    handlerSubscribe(){
      const that = this;
      //口令hash
      const commandSha3 = that.$web3.utils.sha3(that.subscribeCommand); 
      //发送请求
      oracleAbiContract.methods.requestRandom(that.accountAddress,that.userAddress,commandSha3).send({from:that.accountAddress})
      .on('transactionHash', function(hash){
          utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip10"), "toast-top-center");
          console.log('--------->transactionHash:',hash)
      })
      .on('receipt', function(receipt){ 
            utils.toastClear();
          //本地保存数据                     
          utils.toastMsgSuccess(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6"), "toast-top-center")
          $('#subscribeTaskModal').modal('hide');   
          //重新加载数据...
          $(that.purchaseTableName).dataTable().fnDestroy();
          that.btnDisabled =false;
          that.getSubmitList();  
      })
      .on('error', function(error, receipt) { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
          that.btnDisabled =false;
          utils.toastMsgError(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip7")+ error.message, "toast-top-center");
      });

    },
    //取消购买
    async CanclePurchase(hashSeed,block){
        const that = this 
        const heighBlock = await that.$web3.eth.getBlockNumber();
        if(parseInt(block) + parseInt(that.unSubBlocks) < parseInt(heighBlock)){
           utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip14"),"toast-top-center")
          return ;
        }

        if(this.$i18n.locale === 'zh'){
          $("#hTitle").html('取消订购')
          $("#hLable").html('种子哈希')
        }else{
          $("#hTitle").html('Cancle Purchase')
          $("#hLable").html('Seed Hash')
        }
        this.hashSeed = hashSeed;
        $('#addTaskModal').modal('show');
    }, 
    //获取列表
    getConsumeList(){
      const that = this;   
      if (!that.accountAddress) {         
         utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip1"),"toast-top-center")
        return ;
      }  
      //账户地址
      // utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip12"), "toast-top-center");
      oracleAbiContract.methods.getUserSubscribed(that.accountAddress).call(null,function(error,result){
          // utils.toastClear();
          if(error !=null){
            utils.toastMsgError(that.$t("common.commonTips.msgTip5"), that.$t("common.commonTips.msgTip7")+ error.message, "toast-top-center");
          }else{
            const tempList = [];
            result.forEach((element,index) => {
                const item =  {
                    rowNum: (index+1),
                    Block: element.block,
                    EndBlock: element.subBlock,
                    Hash: element.commit,
                    State: element.revealed?1:0
                }
                tempList.push(item);
            });
            that.purchaseList = tempList; 
            that.initTable(tempList); 
            console.log(result) 
          } 
      })
    },
    //提交取消购买
    handlerSubmit(){
        //参数1： 消费者合约地址参数2： 订阅的commit hash
        //unsubscribeRandom(address, bytes32)
        const that = this
         oracleAbiContract.methods.unsubscribeRandom(that.accountAddress,that.hashSeed).send({from:that.accountAddress})
              .on("transactionHash", function (hash) {
                 console.log('hash--------->',hash); 
              })
              .on("receipt", function (receipt) {
                 console.log('receipt--------->',receipt);
                $('#addTaskModal').modal('hide');   
                utils.toastMsgSuccess(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6"), "toast-top-center")               
                if (that.table) {
                  $(that.purchaseTableName).dataTable().fnDestroy();
                   that.getConsumeList();
                } 
              })
              .on("error", function (error) { 
                utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6") + "," + error.code + "," + error.message, "toast-top-center");
              });

          // oracleAbiContract.methods.unsubscribeRandom(that.accountAddress,that.hashSeed).send({from:that.accountAddress},function(error,result){
          //     if(error !=null){
          //       utils.toastMsgError(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip7")+ error.message, "toast-top-center");
          //     }else{
          //       $('#addTaskModal').modal('hide');   
          //       utils.toastMsgSuccess(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6"), "toast-top-center")
          //       console.log("Commit "+result); 
          //     } 
          // })
 
    },
       //查看随机数
    async LookRandom(hashSeed){
      const that = this; 
      const hashCode =  that.$web3.utils.soliditySha3("\x19Ethereum Signed Message:\n32", hashSeed)
      try{
        oracleAbiContract.methods.getRandom(hashSeed).call({from: that.accountAddress}, function(error, result){
            if(error){
              localStorage.setItem(hashSeed,'')
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6") + "," + error.code + "," + error.message, "toast-top-center");
              console.log(error);
            }else{
              localStorage.setItem(hashSeed,'')
              that.randomCode = result;
              $('#randomTaskModal').modal('show');
            } 
        }); 
        
      }catch(error){
           utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6") + "," + error.code + "," + error.message, "toast-top-center");
      }
      
    },
    //关闭
    handlerClose(){
      $('#randomTaskModal').modal('hide');
    }
  },
  watch: {
      //监听wallet
    AccountAddress: {
      immediate:false,
      handler: function (newval) { 
        const that = this;
        that.accountAddress = newval;
        if (that.table) {
          $(that.purchaseTableName).dataTable().fnDestroy();
          that.initTable(this.purchaseList); 
        }
      },
    },
    getLanguage: { 
      handler: function (newval) {
        const that = this;
        if (that.table) {
          $(that.purchaseTableName).dataTable().fnDestroy();
          that.initTable(this.purchaseList); 
        }
      },
    },
  },
};
</script>
<style  >

.modal-content {  border: none; }
.modal-content svg.close {
    position: absolute;
    right: -7px;
    top: -8px;
    font-size: 12px;
    font-weight: 600;
    padding: 2px;
    background: #1b2e4b;
    border-radius: 5px;
    opacity: 1;
    color: #009688;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: .600s; 
}
.modal-content svg.close:hover {
  box-shadow: none;
  transition: .600s;
  opacity: 1 !important; 
} 
.compose-box {
  border-radius: 6px; 
}
.compose-box .compose-content h5 {
  font-weight: 700;
  font-size: 18px;
  color: #bfc9d4;
  text-align: center;

  margin-bottom: 19px;
  padding-bottom: 19px;
  border-bottom: 2px solid #191e3a;

}
.compose-box .compose-content .task-text p {
  word-break: break-word; 
}
 
.compose-box .compose-content .task-text img {
  max-width: 100%; 
} 

.compose-box .compose-content span {
  align-self: center;
  font-size: 14px;
  margin-right: 4px;
  color: #009688;
  font-weight: 600;
  width:180px;
 }

.compose-box .compose-content  #taskdescription {
  height: 170px; 
}

.compose-box .compose-content  .validation-text {
  display: none;
  color: #e7515a;
  font-weight: 600;
  text-align: left;
  margin-top: 6px;
  font-size: 12px;
  letter-spacing: 1px; 
}

 .modal-footer { 
  padding-top: 0;
  justify-content:center;
  border-top: 1px solid #191e3a;
  padding: 0.75rem;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

#addTaskModal .modal-footer .btn[data-dismiss="modal"] {
  background-color: #1b2e4b;
  color: #bfc9d4;
  font-weight: 700;
  border: 1px solid #1b2e4b;
  padding: 10px 25px; 
}

#addTaskModal  .modal-footer .btn.add-tsk {
    background-color: #1b55e2;
    color: #fff;
    font-weight: 600;
    border: 1px solid #1b55e2;
    padding: 10px 25px; 
}

#addTaskModal  .modal-footer .btn.edit-tsk {
    background-color: #009688;
    color: #fff;
    font-weight: 600;
    border: 1px solid #009688;
    padding: 10px 25px; 
}

.modal-backdrop {
  background-color: #515365; 
}

 

</style>
