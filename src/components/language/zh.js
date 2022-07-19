import Common from "./data/common/index"  //通用模块
import HomePage from "./data/homepage"  //homePage 
import purchase from "./data/purchase"  //我的购买 
import mysubmit from "./data/mysubmit"  //我的提交 
import myBalance from "./data/myBalance"  //我的余额 

const zh = {
    language: {
        name: '中文'
    },
    common: {
        topMenu: Common.TopMenu.ZH,
        navHeader: Common.NavHeader.ZH,
        commonTips: Common.commonTips.ZH
    },
    homePage:HomePage.ZH,
    purchase:purchase.ZH,
    mySubmit:mysubmit.ZH,
    myBalance:myBalance.ZH
 
}
export default zh  //暴露出去