const mySubmit={
    ZH: {  //中文翻译
        pageName: "我的提交列表", 
        createButton: "创建新种子", 
        submitButton: "提交种子", 
        btnOperator: "确认", 
        btnApproval: "批准", 
        generate: "自动生成", 
        generaterule:'生成规则：账户地址+时间戳+16进制随机数',
        tabColumns: {
            'rowNum': '序号',
            'Block': '提交块号', 
            'EndBlock': '截止块号',
            'Hash': '种子哈希',
            'State': '购买状态',
            'operator': '操作',
        },
    },
    EN: {  //英文翻译
        pageName: "My Submit List",        
        createButton: "Create New Seed",   
        submitButton: "Submit Seed",      
        btnOperator: "Submit",      
        btnApproval: "Approve", 
        generate: "Generate", 
        generaterule:'Generate rule:account address + timestamp + random number of hex',
        tabColumns: {
            'rowNum': 'Index',
            'Block': 'Submit Block', 
            'EndBlock': 'End Block',
            'Hash': 'Hash',
            'State': 'Purchase State',
            'operator': 'Operation',
        },
    }
}
export default mySubmit 
