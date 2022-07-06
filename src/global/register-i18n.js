//i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
//中英文切换
import ZH from '../components/language/zh.js'  //中文最终汇总暴露的信息
import EN from '../components/language/en.js'  //英文

Vue.use(VueI18n) // vue使用i18n模块

// 创建国际化实例
const i18n = new VueI18n({
    locale:localStorage.getItem('languageSet')||'zh',   //从localStorage里获取用户中英文选择，没有则默认中文
    messages:{
        'zh': ZH,
        'en': EN
    }
})

// locale.i18n((key, value) => i18n.t(key, value))
  
export default i18n 
 