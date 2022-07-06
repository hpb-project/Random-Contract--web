import axios from "axios";
import $ from "jquery";

//获取setting json 
export function getSetting() {    
    var jsondata = $.ajax({ url: "/json/setting.json?ver=1",async: false }).responseText;
     return JSON.parse(jsondata);
}

 
//获取节点列表
export function getNodeList() {     
    var jsondata = $.ajax({ url: "/json/nodelist.json?ver=1",async: false }).responseText;
    return JSON.parse(jsondata);    
}


//获取所有chains的数据  https://yitaiwangluo.com/chains.json
export function getChainsList() {     
    var jsondata = $.ajax({ url: "/json/chains.json?ver=1",async: false }).responseText;
    return JSON.parse(jsondata);    
}

//获取所有chains的数据  https://yitaiwangluo.com/chains.json
export function getLockReward() {     
    var jsondata = $.ajax({ url: "/json/lockreward.json?ver=1",async: false }).responseText;
    return JSON.parse(jsondata);    
}

