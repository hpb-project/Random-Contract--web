import Common from "./data/common/index"  //通用模块
import HomePage from "./data/homepage"  //homePage 
import purchase from "./data/purchase"  //我的购买 
import mysubmit from "./data/mysubmit"  //我的提交 
import myBalance from "./data/myBalance"  //我的余额 


const en = {
    language: {
        name: 'En'
    },
    common: {
        topMenu: Common.TopMenu.EN,
        navHeader: Common.NavHeader.EN,
        commonTips: Common.commonTips.EN
    },
    homePage:HomePage.EN, 
    purchase:purchase.EN, 
    mySubmit:mysubmit.EN,
    myBalance:myBalance.EN
    
}
export default en