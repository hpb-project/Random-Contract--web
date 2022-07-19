//1.导入vue 和 vuerouter 的包
import Vue from 'vue'
import VueRouter from 'vue-router'
 
//2.调用vue.use() 函数，把 VueRouter 安装为 Vue 的插件
//vue.use()函数的作用，就是来安装插件的
Vue.use(VueRouter)

const routes = [{
  path: "/",
  name: "Home",
  component: () =>
    import( /* webpackChunkName: "home" */ "../layouts/BasicLayout.vue"),
  children: [
    {
      path: '/',
      name: 'Home',
      component: () =>
        import( /* webpackChunkName: "home" */ "../pages/HomePage.vue"),
    },
    {
      path: '/document',
      name: 'DocumentPage',
      component: () =>
        import( /* webpackChunkName: "document" */ "../pages/DocumentPage.vue"),
    },  
    {
      path: '/purchase',
      name: 'PurchasePage',
      component: () =>
        import( /* webpackChunkName: "purchase" */ "../pages/PurchasePage.vue"),
    }, 
    {
      path: '/mysubmit',
      name: 'MySubmit',
      component: () =>
        import( /* webpackChunkName: "mysubmit" */ "../pages/MySubmit.vue"),
    }, {
      path: '/mybalance',
      name: 'MyBalance',
      component: () =>
        import( /* webpackChunkName: "mysubmit" */ "../pages/MyBalance.vue"),
    },
  ]
}
];
//3.创建路由的实例对象
const router = new VueRouter({  
  mode: 'history',  // 去掉路由地址的#
  routes  
}) 
 
//4.向外共享路由的实例对象
export default router
 