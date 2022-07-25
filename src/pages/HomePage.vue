<template>  
    <div id="content" class="main-content">
        <div class="layout-px-spacing">
           <!--  <div class="page-header">
                <div class="page-title">
                    <h5>{{$t('homePage.pageName')}}</h5>
                </div> 
            </div>  -->
            <div class="row">
              <!-- banner -->
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style="margin-top:10px;">
                    <div id="style1" class="carousel slide style-custom-1" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#style1" data-slide-to="0" class="active"></li>
                            <li data-target="#style1" data-slide-to="1"></li>
                            <li data-target="#style1" data-slide-to="2"></li>
                            <li data-target="#style1" data-slide-to="3"></li>
                            <li data-target="#style1" data-slide-to="4"></li>
                        </ol>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="d-block w-100 slide-image" :src="getBanner1" alt="First slide">
                               <!--  <div class="carousel-caption"> 
                                  <h2 class="hero-title">
                                    <span>安全、公平的</span> 随机数交易平台
                                  </h2>  
                                </div> -->
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100 slide-image" :src="getBanner2" alt="Second slide">
                              
                            </div>
                            <div class="carousel-item">
                                <img class="d-block w-100 slide-image" :src="getBanner3" alt="Third slide"> 
                            </div>  
                            <div class="carousel-item">
                                <img class="d-block w-100 slide-image" :src="getBanner4" alt="Four slide"> 
                            </div> 
                             <div class="carousel-item">
                                <img class="d-block w-100 slide-image" :src="getBanner5" alt="Five slide"> 
                            </div>
                        </div>
                       <!--  <a class="carousel-control-prev" href="#style1" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#style1" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a> -->
                    </div>
                </div> 

                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "  style="margin-top:10px;">
                    <div class="row widget-statistic">
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-2">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">
                                            <p class="mb-2 text-white f-2">{{$t('homePage.totalSubmitCounts')}}</p>
                                            <div class="d-flex flex-wrap justify-content-start align-items-center">
                                            <h5 class="mb-0 font-weight-bold w-value">{{totalSubmitCount}}</h5> 
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-2">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">
                                            <p class="mb-2 text-white f-2">{{$t('homePage.totalUseCounts')}}</p>
                                            <div class="d-flex flex-wrap justify-content-start align-items-center">
                                            <h5 class="mb-0 font-weight-bold w-value">{{totalConsumeCount}}</h5>
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-2">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">
                                            <p class="mb-2 text-white f-2">{{$t('homePage.hoursUseCounts')}}</p>
                                            <div class="d-flex flex-wrap justify-content-start align-items-center">
                                            <h5 class="mb-0 font-weight-bold w-value">{{hourCount}}</h5>
                                            <!-- <p class="mb-0 ml-3 text-success font-weight-bold">+3.55%</p> -->
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12 mb-2">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">
                                            <p class="mb-2 text-white f-2">{{$t('homePage.randomCounts')}}</p>
                                            <div class="d-flex flex-wrap justify-content-start align-items-center">
                                            <h5 class="mb-0 font-weight-bold w-value">{{totalRandomCount}}</h5>
                                            <!-- <p class="mb-0 ml-3 text-success font-weight-bold">+3.55%</p> -->
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div> 
                    </div>
                </div> 
                <!-- 折线图 -->
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div class="widget widget-chart-three">
                        <div class="widget-heading">
                            <div class="">
                                <h5 class="">{{$t('homePage.randomLinCharts')}}</h5>
                            </div>                             
                        </div>
                        <div class="widget-content">
                            <apexchart height="260" :options="chartOptions" :series="series"></apexchart> 
                        </div>
                    </div>
                </div> 
                <!-- Token信息  -->
                <div  class="col-xl-12 col-md-12 col-sm-12 col-12 layout-top-spacing "> 
                    <h4>{{$t('homePage.tokenShow')}}</h4>  
                </div>
                         
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-top-spacing layout-spacing">
                    <div class="widget widget-card-four">                         
                        <div class="widget-content">
                            <div class="w-content">
                                <div class="w-info">
                                    <h5 class="value">{{tokenName}}</h5>
                                    <p class="">{{tokenSymbol}}</p> 
                                </div>
                                <div class="">
                                 
                                   <div v-if="HRGBalance !==0" class="row align-items-center"  >  
                                       <h5 class="value" style="margin-bottom:0;">
                                       {{HRGBalance}}
                                       </h5>  
                                        &nbsp;                                   
                                       <div class="w-icon">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                       </div>                           
                                   </div>
                                    
                                    <div v-else class="w-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>

                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-top-spacing layout-spacing">
                    <div class="widget widget-card-four">
                        <div class="widget-content">
                            <div class="w-content">
                                <div class="w-info">
                                    <h5 class="value">{{price}}</h5>
                                    <p class="">{{csupply}}/{{supply}}</p>
                                </div>
                                <div class=""> 
                                    <div class="w-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
                <!-- 表格 -->
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-1">
                    <div class="table-responsive mb-4 mt-1">
                        <table id="highTable" class="table style-3   table-hover"  
                        style="word-break: break-all; word-wrap: break-all;   text-align: center;">
                            <thead>
                                <tr>
                                    <th>{{$t("homePage.tabColumns.rowNum")}}</th>
                                    <th>{{$t("homePage.tabColumns.holderAddress")}}</th> 
                                    <th>{{$t("homePage.tabColumns.quantity")}}</th>
                                    <th>{{$t("homePage.tabColumns.percentage")}}</th>  
                                </tr>
                            </thead>  
                        </table>
                    </div>
                </div> 

            </div> 
            <Footer></Footer> 
        </div>
    </div> 
</template>

<script>
import Footer from '../components/Footer.vue';
import {oracleAbiContract,tokenAbiContract} from '../utils/getContract'
import utils from '../utils/custom';
import {getTokeninfo,getConsumedOneday,getConsumedHistory} from '../api/manage'
import moment from 'moment'

export default {
  components: { Footer },
  name: "HomePage",
  data() {
    return {
      totalSubmitCount:0,
      totalConsumeCount:0,
      hourCount:0,
      totalRandomCount:0,
      chartOptions: { 
        colors: ['#1b55e2'],
        chart: {
          id: "chartLine", 
          toolbar: {
            show: false,
          },
          type: "area",
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
           curve: 'smooth'
        }, 
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          labels: {
            offsetY: 0,
            minWidth: 20,
            maxWidth: 20,
          },
        },
        xaxis: {
          type: "date",
          labels: {
            minHeight: 20,
            maxHeight: 20,
          },
          categories: [ ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yyyy",
          },
        },
      },
      series: [{name: "counts", data: [] }],
      table: null,
      highTableList: [  ],
      highTableName: "#highTable",
      tokenName:'',
      tokenSymbol:'',
      price:'',
      csupply:'',
      supply:'',
      HRGBalance:0,
      accountAddress:'',
      imageUrl:{
        banner1:this.$t("homePage.banner1"),
        banner2:this.$t("homePage.banner2"),
        banner3:this.$t("homePage.banner3"),
        banner4:this.$t("homePage.banner4"),
        banner5:this.$t("homePage.banner5"),
      }

    };
  },
  computed: {
      getLanguage() {
         return this.$i18n.locale;
      },
      getBanner1(){
         return this.$t("homePage.banner1");
      },
      getBanner2(){
         return this.$t("homePage.banner2");
      },
      getBanner3(){
         return this.$t("homePage.banner3");
      },
      getBanner4(){
         return this.$t("homePage.banner4");
      },
      getBanner5(){
         return this.$t("homePage.banner5");
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
  mounted() {

    const that = this;
    that.loadCharts();
    that.getHRGBalance();   
    that.getBannerData()
  },
  methods: {

    //加载折线图
    loadCharts(){
      const that = this
      getConsumedHistory()
      .then(function (res){
          if(res.error === '200'){ 
            let listDate = [] //日期
            let listValue = [] //数据
            res.data.forEach(item => {
              listDate.push(moment(parseInt(item.dt)*1000).format('YYYY-MM-DD'));
              listValue.push(item.y); 
            }); 
            that.series = [{name: "counts", data: listValue }]
            that.chartOptions = {
                colors: ['#1b55e2'],
                chart: {
                  id: "chartLine", 
                  toolbar: {
                    show: false,
                  },
                  type: "area",
                },
                dataLabels: {
                  enabled: true,
                },
                stroke: {
                  curve: 'smooth'
                }, 
                grid: {
                  xaxis: {
                    lines: {
                      show: false,
                    },
                  },
                  yaxis: {
                    lines: {
                      show: false,
                    },
                  },
                },
                yaxis: {
                  labels: {
                    offsetY: 0,
                    minWidth: 20,
                    maxWidth: 20,
                  },
                },
                xaxis: {
                  type: "date",
                  labels: {
                    minHeight: 20,
                    maxHeight: 20,
                  },
                  categories: listDate,
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yyyy",
                  },
                },
              }
          }else{
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"), res.err_msg, "toast-top-center");
          }
      }).catch(function (err) {
              console.log(err);
      });
    },

    //初始化表格
    initTable(dataList){
      var that = this;
      that.table = $(that.highTableName).DataTable({
        autoWidth: false,
        data: dataList,
        retrieve: true,
        bFilter:false,
        bLengthChange:false,
        columns: [
          { widht: "60px", data: "rowNum" },  
          { widht: "220px",data: "holderAddress" },
          { widht: "120px", data: "holderCount" },
          { widht: "120px", data: "holderPercent" },
        ],
        oLanguage: that.tableLanguage,
      });
    },
    
    getHRGBalance(){
        const that = this
        if(!that.IsConnected && web3.currentProvider.selectedAddress) {     
          that.accountAddress = web3.currentProvider.selectedAddress
        }
        if(that.accountAddress !=''){
          tokenAbiContract.methods.balanceOf(that.accountAddress).call(null,function(err,result){ 
            if(err !==null){
                that.HRGBalance = 0;
            }else{
                that.HRGBalance = that.$web3.utils.fromWei(result,'ether');
            }
          });
        }
    },
    //获取banner数据
    getBannerData(){
      const that = this
      try {
        oracleAbiContract.methods.getTotalStat().call(null,function(error,result){
          if(error !=null){
            utils.toastMsgError(that.$t("common.commonTips.msgTip4"), that.$t("common.commonTips.msgTip13"), "toast-top-center");
          }else{ 
            that.totalSubmitCount = result[0]
            that.totalConsumeCount = result[1]
            that.totalRandomCount = result[2] 
          } 
        });

        getConsumedOneday().then(function (res) {
            if(res.error === '200'){
              that.hourCount = res.data
            }else{
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"), res.err_msg, "toast-top-center");
            }
          }).catch(function (err) {
              console.log(err);
          }).finally(function () {
              // console.log("End");
        });

        //获取token信息
        getTokeninfo().then((res)=>{ 
            if(res.error === '200'){
                that.tokenName = res.data.name;
                that.tokenSymbol = res.data.symbol;
                that.price = res.data.price;
                that.csupply = res.data.csupply;
                that.supply = res.data.supply;

                const listArr = res.data.holdlist.token_holder_list; 

                listArr.forEach((item,index)=>{
                    let temp = {
                      rowNum: (index + 1),
                      holderAddress: item.holder_address,
                      holderCount: item.quantity,
                      holderPercent: item.percentage
                    };
                    that.highTableList.push(temp)  
                })

                that.initTable(that.highTableList)
                
                
            }else{
              utils.toastMsgError(that.$t("common.commonTips.msgTip4"), res.err_msg, "toast-top-center");
            }
        }).catch(err=>{
            console.log(err)
        })

      } catch (err) { 
        console.log(err) 
      }
    },

  },
  watch: {
    getLanguage: {
      immediate:false,
      handler: function (newval) {
        const that = this;
        if (that.table) {
          $(that.highTableName).dataTable().fnDestroy();
           that.initTable(this.highTableList); 
        }
      },
    },
     //监听wallet
    AccountAddress: {
      immediate:false,
      handler: function (newval) { 
        const that = this;
        that.accountAddress = newval;
        that.getHRGBalance()
      },
    },
  },
};
</script>

<style scoped>
  .dataTable{
     text-align:center;
  }
  .hero-title {
    font-weight: normal;
    color: #ffffff;
    font-size: 40px;
    position: relative;
    margin-bottom: 12px;
    line-height: 1.3em;
  }
  .hero-title > span {
    font-weight: 700;
    display: block;
  }
</style> 