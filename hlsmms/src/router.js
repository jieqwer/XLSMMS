import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import('./views/Login.vue')
    }
    , {
      path: '/useradd',
      // 添加用户
      // 异步加载：懒加载，在需要的时候才加载，目的是节省内存占用
      component: () => import('./views/UserAdd.vue')
    },
    {
      path: '/userlist',
      component: () => import('./views/UserList.vue')
    },
    {
      path: '/pwdedit',
      component: () => import('./views/UserPwdEdit')
    },
    {
      path: '/vipadd',
      component: () => import('./views/vipAdd')
    },
    {
      path: '/viplist',
      component: () => import('./views/vipList')
    },
    {
      path: '/classAdd',
      component: () => import('./views/classAdd')
    },
    {
      path: '/classList',
      component: () => import('./views/ClassList')
    },
    {
      path: '/shopList',
      component: () => import('./views/shopList')
    },
    ,
    {
      path: '/shopadd',
      component: () => import('./views/shopadd')
    }
  ]
})


