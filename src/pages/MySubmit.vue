<template lang="">
    <div id="content" class="main-content">
        <div class="layout-px-spacing"> 
            <div class="row layout-top-spacing"> 
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="widget widget-chart-three">
                        <div class="widget-heading"> 
                            <h5 class="" style="line-height:37px">{{$t("mySubmit.pageName")}}</h5> 

                            <div class="dropdown  custom-dropdown">  
                                <button class="btn btn-outline-info " @click="createSeeds">{{$t("mySubmit.createButton")}}</button> 
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
             <!-- 表格 -->
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 widget widget-chart-three">
                <div class="table-responsive mb-4 mt-1">
                    <table id="mySubmitTable" class="table style-3   table-hover"  
                    style="word-break: break-all; word-wrap: break-all;   text-align: center;min-width:850px;">
                        <thead>
                            <tr>
                                <th>{{$t("mySubmit.tabColumns.rowNum")}}</th>
                                <th>{{$t("mySubmit.tabColumns.Block")}}</th>
                                <th>{{$t("mySubmit.tabColumns.EndBlock")}}</th> 
                                <th>{{$t("mySubmit.tabColumns.Hash")}}</th>
                                <th>{{$t("mySubmit.tabColumns.State")}}</th>  
                                <th>{{$t("mySubmit.tabColumns.operator")}}</th>  
                            </tr>
                        </thead>  
                    </table>
                </div>  
            </div>    
            <!-- Modal --> 
            <div class="modal fade" id="addTaskModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-dialog-centered  modal-lg" role="document">
                    <div class="modal-content" >
                        <div class="modal-body">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            <div class="compose-box">
                                <div class="compose-content" id="addTaskModalTitle">
                                    <h5 id="hTitle1" class="task-heading">创建种子</h5>     
                                    <div class="statbox widget box box-shadow">
                                      <div class="form-group mb-4">
                                            <label id="hLable1">Seed</label>     
                                           <div class="input-group mb-4">
                                               <input type="text" placeholder="0x"  class="form-control"  v-model="seed" :disabled="isDisabled"> 
                                              <div class="input-group-append" v-if="isShowGenerate">
                                                 <button  class="btn btn-primary"  @click="handlerGenerate">{{$t("mySubmit.generate")}}</button>
                                              </div>
                                          </div>

                                             <small id="emailHelp1" class="form-text text-muted">{{$t("mySubmit.generaterule")}}</small>
                                        </div>
                                        <div class="form-group mb-4">
                                            <label id="hLable2">Hash Seed</label>                                            
                                            <input type="text" placeholder="0x"  class="form-control" v-model="hashSeed" disabled="disabled" readonly="readonly"  > 
                                        </div>
                                        
                                        <div class="form-group mb-4">
                                            <label id="hLable3">HRG Balance</label>   
                                            <input type="text" id="disabledTextInput" v-model="HRGBalance" class="form-control" disabled="disabled" readonly="readonly">                                           
                                        </div>

                                        <div   class="form-group mb-4">
                                          <p class="">
                                            {{showMsgTips}} 
                                          </p>
                                        </div>
                                    </div>   
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer"> 
                            <button  class="btn btn-info" v-if="approveShow" :disabled="approveDisabled" @click="handlerApproval" >{{$t("mySubmit.btnApproval")}}</button>
                            <button  class="btn btn-info"  :disabled="btnDisabled" @click="handlerSubmit" >{{$t("mySubmit.btnOperator")}}</button>
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
import {configAbiContract,oracleAbiContract,depositaddr,erc20Signed,erc20Contract,tokenAbiContract} from '../utils/getContract'
export default {
  name: "MySubmit",
  components: { Footer },
  data(){
    return {
      accountAddress:'', 
      curType:0, //0 创建 1 提交
      isDisabled:false, //种子hash是否可以输入
      hashSeed:'', //种子hash 
      seed:'',//种子curType=1 提交时候填写
      table: null,
      mySubmitList: [],
      HRGBalance:0, //hrg余额
      mySubmitTableName: "#mySubmitTable",
      btnDisabled:false,
      approveDisabled:false,//批准可用
      approveShow:true,//批准可以显示
      blockMax:0, //提交最大值
      lockToken:0, //质押数量
      lockTokenCount:0,//未转换位数的质押数量
      isShowGenerate:true,//是否显示自动生成按钮

    }
  },

  computed: {
    showMsgTips(){
      let msg = this.$t("common.commonTips.msgTip15");
      return msg.replaceAll('${block}',this.blockMax).replaceAll("${lockToken}",this.lockToken)
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
    IsConnected(){ 
       return this.$store.state.web3.isConnected;
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
      that.blockMax = await configAbiContract.methods.getMaxVerifyBlocks().call() || 0;
      //质押数量
      that.lockTokenCount= await configAbiContract.methods.getDepositAmount().call()|| 0;
      that.lockToken = that.$web3.utils.fromWei(that.lockTokenCount||0,'ether');
      that.getSubmitList();
  },

  methods: {
    initTable(dataList){
      var that = this;
      that.table = $(that.mySubmitTableName).DataTable({
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
                  if(data == "0") {
                      return '<span class="badge outline-badge-danger">UnSubscribed</span>';
                  } else {
                      return '<span class="badge outline-badge-success">Subscribed</span>';
                  }
                 
               }else{
                  if (data == "0"){                       
                      return '<span class="badge outline-badge-danger">无订购</span>';
                  }else{
                      return '<span class="badge outline-badge-success">被订购</span>';
                  } 
               }            
            },
          },
          { widht: "120px",data: "null",render: function (data, type, full, meta) {
              var btnToSubmit = "btnsubmit" + full.rowNum;
              $(that.mySubmitTableName).undelegate("tbody #" + btnToSubmit, "click");
              $(that.mySubmitTableName).on("click", "tbody #" + btnToSubmit,
                function () {
                    that.submitSeeds(full.Hash,full.EndBlock);
                }
              ); 
              var operator = '<button id='+ btnToSubmit +' class="btn btn-info">'+ that.$t("mySubmit.submitButton") +'</button> ';
              
              return operator;
            },
          }
        ],
        lengthMenu: [7, 10, 20, 50],
        pageLength: 7,
        oLanguage: that.tableLanguage,
      });
    },
    getRamNumber(){
      var result=this.accountAddress; 
      result += Date.now().toString(16)
      const length = 66- result.length;
      for(var i=0;i<length;i++){    
        result+=Math.floor(Math.random()*16).toString(16);//获取0-15并通过toString转16进制
      }
      return result;
    }, 
    //自动生成
    handlerGenerate(){
      const that = this;
      that.seed =that.getRamNumber();
      oracleAbiContract.methods.getHash(that.seed).call(null,function(error,result){
          if(error !=null){
              console.log('getHash-------->',error)
          }else{
            that.hashSeed = result;
          } 
      }) 
    },
    //创建种子
    createSeeds(){ 
      const that = this;
      that.isDisabled = false;
      that.isShowGenerate = true;
      that.curType = 0;
      //显示批准
      that.approveShow =true;
      //批准可用
      that.approveDisabled = false;
      //确认不可用
      that.btnDisabled = true;
      that.seed = '';
      that.hashSeed = ''
      if(that.$i18n.locale === 'zh'){
        $("#hTitle1").html('创建种子')
        $("#hLable1").html('输入种子')
        $("#hLable2").html('输入种子哈希')
        $("#hLable3").html('HRG余额')
       
      }else{
        $("#hTitle1").html('Create Seed')
        $("#hLable1").html('Input Seed')
        $("#hLable2").html('Input Seed Hash')
        $("#hLable3").html('HRG Balance')
      } 
      

      $('#addTaskModal').modal('show');
    },
    //批准
    async handlerApproval(){ 
      const that = this  
      try{       
          that.approveDisabled =true;
          if (!that.seed.startsWith('0x') || that.seed.length != 66|| that.seed.length != 66) {      
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip2"),"toast-top-center")
              that.approveDisabled =false;
              return ;
        }
        if(that.HRGBalance === '0'){
            utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip16"),"toast-top-center")
            that.approveDisabled =false;
            return ; 
        } 
        if(parseInt(that.lockToken) >parseInt(that.HRGBalance)){
            that.approveDisabled =false;
            utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip17"),"toast-top-center")
            return ; 
        }
        
        let tx = await  erc20Signed.approve(depositaddr, that.lockTokenCount);
     
        
        //等待approve完成
        utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip10"), "toast-top-center");
        await tx.wait();
        console.log('tx--------->',tx);
        utils.toastClear(); 
        that.btnDisabled =false; 
 
      }catch(e){
        that.approveDisabled =false;
        that.btnDisabled =true; 
        utils.toastClear();
        utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip9") + "," + 
            e.code + "," + e.message, "toast-top-center"); 
        console.log('-------',e)
      } 
       
    },
    //提交
    async submitSeeds(hashSeed,endBlock){
        const that = this; 
        //不显示批准
        that.approveShow =false;
        //种子不能填写
        that.isDisabled = true; 
        that.isShowGenerate = false;
        that.btnDisabled =false;
        if(that.$i18n.locale === 'zh'){
          $("#hTitle1").html('提交种子')
          $("#hLable3").html('HRG余额')
          $("#hLable1").html('输入种子')
          $("#hLable2").html('输入种子哈希')
        }else{
          $("#hTitle1").html('Submit Seed')
          $("#hLable1").html('Input Seed')
          $("#hLable2").html('Input Seed Hash')
          $("#hLable3").html('HRG Balance')
        } 

        const heighBlock = await that.$web3.eth.getBlockNumber();
        if(parseInt(endBlock) < parseInt(heighBlock)){
           utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip14"),"toast-top-center")
          return ;
        }
        this.curType = 1 ;//提交种子       
        this.hashSeed = hashSeed;
        this.seed = localStorage.getItem(hashSeed);
        $('#addTaskModal').modal('show');
    },
    //确认
    async handlerSubmit(){
      const that = this  
      try{       
          that.btnDisabled =true;
          if (!that.seed.startsWith('0x') || that.seed.length != 66|| that.seed.length != 66) {      
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip2"),"toast-top-center")
              that.btnDisabled =false;
              return ;
          }
        if(that.HRGBalance === '0'){
            utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip16"),"toast-top-center")
            that.btnDisabled =false;
            return ; 
        }

        if(this.curType === 0){    
         /*  if(parseInt(that.lockToken) >parseInt(that.HRGBalance)){
             that.btnDisabled =false;
             utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip17"),"toast-top-center")
              return ; 
          } */
          //提交
          oracleAbiContract.methods.commit(that.hashSeed).send({from:that.accountAddress})
            .on('transactionHash', function(hash){
              localStorage.setItem(that.hashSeed,that.seed);
              utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip10"), "toast-top-center");
              console.log('--------->transactionHash:',hash)
            })
            .on('receipt', function(receipt){
                console.log('--------->receipt:',receipt)
                utils.toastClear();
                //本地保存数据                     
                utils.toastMsgSuccess(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6"), "toast-top-center")
                $('#addTaskModal').modal('hide');   
                //重新加载数据...
                $(that.mySubmitTableName).dataTable().fnDestroy();
                that.btnDisabled =false;
                that.getSubmitList();  
            })
            .on('error', function(error, receipt) { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
                that.btnDisabled =false;
                utils.toastClear();
                utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip9") + "," + 
                          error.code + "," + error.message, "toast-top-center");
                console.log(error,error)
            });
            
          

        }else{           
          //提交种子
           oracleAbiContract.methods.reveal(that.hashSeed,that.seed).send({from:that.accountAddress})
            .on('transactionHash', function(hash){
                utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip10"), "toast-top-center");
                console.log('--------->transactionHash:',hash)
            })
            .on('receipt', function(receipt){
                $('#addTaskModal').modal('hide');   
                 utils.toastClear();
                //本地保存数据                     
                utils.toastMsgSuccess(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6"), "toast-top-center")
                $('#addTaskModal').modal('hide');   
                //重新加载数据...
                $(that.mySubmitTableName).dataTable().fnDestroy();
                that.btnDisabled =false;
                that.getSubmitList();  
            })
            .on('error', function(error, receipt) { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
                that.btnDisabled =false;
                utils.toastMsgError(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip7")+ error.message, "toast-top-center");
            });
         /*  oracleAbiContract.methods.reveal(that.hashSeed,that.seed).send({from:that.accountAddress},function(error,result){
              if(error !=null){
                that.btnDisabled =false;
                utils.toastMsgError(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip7")+ error.message, "toast-top-center");
              }else{
                $('#addTaskModal').modal('hide');   
                utils.toastMsgSuccess(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip6"), "toast-top-center")
                console.log("Commit "+result); 
              }
          }) */
        }
      }catch(e){
        that.btnDisabled =false;
        utils.toastClear();
        utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip9") + "," + 
            e.code + "," + e.message, "toast-top-center"); 
        console.log('-------',e)
      } 
    },

    async getSubmitList(){
      const that = this;   
      if(!that.accountAddress) {
        utils.toastMsgError(that.$t("common.commonTips.msgTip5"),that.$t("common.commonTips.msgTip1"),"toast-top-center")
        return ;
      }  
      tokenAbiContract.methods.balanceOf(that.accountAddress).call(null,function(err,result){  
         if(err !==null){
            that.HRGBalance =0;
         }else{ 
            that.HRGBalance = that.$web3.utils.fromWei(result,'ether');
         }
      });
     utils.toastShowWait(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip12"), "toast-top-center");
     //账户地址 
      oracleAbiContract.methods.getUserUnverifiedList(that.accountAddress).call(null,function(error,result){
         utils.toastClear();
          if(error !=null){
            utils.toastMsgError(that.$t("common.commonTips.msgTip5"), that.$t("common.commonTips.msgTip7")+ error.message, "toast-top-center");
          }else{
            console.log(result) 
            that.mySubmitList= [] 
            result.forEach(function(item,index,self){
                const obj = {
                  rowNum :index +1,
                  Block:item.block,
                  EndBlock:parseInt(item.block) +parseInt(that.blockMax),
                  Hash:item.commit,
                  State:item.substatus 
                }
                that.mySubmitList.push(obj)

            })
            that.initTable(that.mySubmitList); 
          } 
      });

    },

  },

  watch: {
    seed:{
      immediate:false,
      handler: function (newval,oldval) {
        const that = this; 
        if(oldval =='') return 
        if(newval =='') return 
        if(!newval.toUpperCase().startsWith('0X')){
            that.hashSeed = '';
            utils.toastMsgError(that.$t("common.commonTips.msgTip4"),that.$t("common.commonTips.msgTip2"),"toast-top-center")
            return ; 
        } 
        oracleAbiContract.methods.getHash(newval).call(null,function(error,result){
          if(error !=null){
              console.log('getHash-------->',error)
          }else{
            that.hashSeed = result;
          } 
        })
      }
    },
    //监听wallet
    AccountAddress: {
      immediate:false,
      handler: function (newval) { 
        const that = this;
        that.accountAddress = newval;
        if (that.table) {
          $(that.mySubmitTableName).dataTable().fnDestroy();
          that.getSubmitList(); 
        }
      },
    },
    getLanguage: { 
      handler: function (newval) {
        const that = this;
        if (that.table) {
          $(that.mySubmitTableName).dataTable().fnDestroy();
          that.initTable(this.mySubmitList); 
        }
      },
    },
  },

}


</script>
<style>

.ft13{
  font-size: 13px;
}
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