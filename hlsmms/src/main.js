import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./assets/style/plublic.css"
import axios from "axios"
import qs from "qs"


Vue.prototype.axios = axios;
Vue.prototype.qs = qs

Vue.config.productionTip = false

//构造全局守卫
router.beforeEach((to, from, next) => {
  axios.defaults.withCredentials = true;
  // 发起ajax到后端路由获取cookie，cookie存在就放行，否则去登录页面
  axios.get("http://127.0.0.1:888/users/getCookie").then(result => {
    // console.log("验证的结果", result);
    //如果登录成或者是访问的页面时登录页面就放行
    if (result.data.isOk || to.path == "/login") {
      next(); //录成功放行
    }
    //否则就跳转到登录页面
    else {
      next("/login");
    }
  }).catch(err => {
    console.error("错误了!" + err.message);
  });
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
