import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import ad from '@/components/home/ad'
import enterprise from '@/components/home/enterprise'
import post from '@/components/home/post'
import talent from '@/components/home/talent'
import Login from '@/components/login'
import Register from '@/components/register'
import User from '@/components/userPage'
import Company from '@/components/companyPage'
import Admin from '@/components/admin'
import checkPost from '@/components/admin/checkPost'
import checkDeliver from '@/components/admin/checkDeliver'
import checkAd from '@/components/admin/checkAd'
Vue.use(Router)

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home/ad',
      name: 'ad',
      component: ad
    },
    {
      path: '/home/enterprise',
      name: 'enterprise',
      component: enterprise
    },
    {
      path: '/home/post',
      name: 'post',
      component: post
    },
    {
      path: '/home/talent',
      name: 'talent',
      component: talent
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: User
    },
    {
      path: '/companyPage',
      name: 'companyPage',
      component: Company
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/checkPost',
      name: 'checkPost',
      component: checkPost
    },
    {
      path: '/admin/checkDeliver',
      name: 'checkDeliver',
      component: checkDeliver
    },
    {
      path: '/admin/checkAd',
      name: 'checkAd',
      component: checkAd
    },
  ]
})
