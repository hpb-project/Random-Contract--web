const commonTips = {
    ZH: {  //中文翻译
        msgTip1:'请先登录钱包',
        msgTip2:'输入错误，请输入64位16进制字符串',
        msgTip3:'用户拒绝了交易',
        msgTip4:'提示',
        msgTip5:'错误',
        msgTip6:'交易成功',
        msgTip7:'交易失败',  
        msgTip8:'取消交易成功',
        msgTip9:'取消交易失败',
        msgTip10:'交易已提交,请稍等......',
        msgTip11:'投票额度不足，您当前可用投票额度为：XXX',
        msgTip12:'正在加载数据中，请稍后...',     
        msgTip13:'获取数据失败!',
        msgTip14:'已经超过验证截止区块!',
        msgTip15:'本操作需要质押 ${lockToken} HRG Token. 提交成功后，您在 ${block} 个区块内完成种子验证可退回押金并获得奖励，超过 ${block} 区块后将无法验证，押金不予退回。',
        msgTip16:'您当前的HRG为0，请先充值',
        msgTip17:'HRG 数量不足，请先充值',
        msgTip18:'${block}个区块后无法取消购买。',
        msgTip19:'输入错误，请输入42位16进制字符串',

    },
    EN: {  //英文翻译
        msgTip1:'Please connect to wallet',
        msgTip2:'Input error,please enter 64 bit hex string',
        msgTip3:'User denied transaction',
        msgTip4:'Tips',
        msgTip5:'Error',
        msgTip6:'Transaction Success!',
        msgTip7:'Transaction Failure!',  
        msgTip8:'Cancel Transaction Success!',
        msgTip9:'Cancel Transaction Failure!',
        msgTip10:'Transaction Submitted, please wait......',
        msgTip11:'The Vote Quota Is Insufficient. Your Current Available Vote Quota Is XXX',
        msgTip12:'Loading data,waiting....', 
        msgTip13: "Get Data Failed!",
        msgTip14: "Exceeded The Deadline!",
        msgTip15: "This operation requires pledge ${block} HRG token, you can return the deposit and get rewards after completing seed verification within ${block} blocks. If you exceed ${block} blocks, you will not be able to verify and the deposit will not be returned.",
        msgTip16:'Your HRG is 0, please recharge first！',
        msgTip17:'HRG Token not enough, please recharge first!',
        msgTip18:'Can not cancel the purchase after ${block} blocks。',
        msgTip19:'Input error,please enter 42 bit hex string',
    }
}
export default commonTips  //需要暴露出去