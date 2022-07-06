<template lang="">
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
            <div class="row layout-top-spacing"> 
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="widget widget-chart-three">
                        <div class="widget-heading"> 
                            <h5 class="" style="line-height:37px">{{$t("purchase.pageName")}}</h5>  
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
              <!-- Modal --> 
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
        
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from '../components/Footer.vue';  
import utils from '../utils/custom';
import {blockRange,oracleAbiContract} from '../utils/getContract'
export default {
  name: "PurchasePage",
  components: { Footer },
  data(){
    return {
      accountAddress:'', 
      hashSeed:'',
      table: null,
      purchaseList: [],
      purchaseTableName: "#purchaseTable",
    }
  },
  computed: {
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
  mounted() {
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
      that.getConsumeList();
   
  },
  methods: {
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
              let html =
                '<span  class="btn-link text-warning" title="' +
                data +
                '" >' +
                displayText +
                "</span>";
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
            },
          }
        ], 
        oLanguage: that.tableLanguage,
      });
    }, 
    async CanclePurchase(hashSeed,block){
        const that = this
        //获取当前块的高度
        const heighBlock = await that.$web3.eth.getBlockNumber();
        if(parseInt(block) + parseInt(blockRange) < parseInt(heighBlock)){
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

#addTaskModal .modal-footer { 
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

#addTaskModal .modal-footer .btn.add-tsk {
    background-color: #1b55e2;
    color: #fff;
    font-weight: 600;
    border: 1px solid #1b55e2;
    padding: 10px 25px; 
}

#addTaskModal .modal-footer .btn.edit-tsk {
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