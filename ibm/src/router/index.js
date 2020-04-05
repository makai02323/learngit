import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import login from '@/components/login'
import home from '@/components/home'
import page from '@/components/page'
import infor from '@/components/mycount/infor'
import wallet from '@/components/mycount/wallet'
import password from '@/components/mycount/password'
import password1 from '@/components/mycount/2_password'
import phone from '@/components/mycount/phone'
import accounts from '@/components/mycount/transfer_accounts'
import cash from '@/components/wallet/cash'
import registerWallet from '@/components/wallet/registerWallet'
import MT4Wallet from '@/components/wallet/MT4Wallet'
import invite from '@/components/register/invite'
import deposit from '@/components/Deposit/deposit'
import depositRecord from '@/components/Deposit/depositRecord'
import gold from '@/components/Gold/gold'
import goldRecord from '@/components/Gold/goldRecord'
import buyMating from '@/components/product/buyMating'
import buyList from '@/components/product/buyList'
import Rescission from '@/components/product/Rescission'
import tip_lists from '@/components/tip_lists'
import feedback from '@/components/feedback/feedback'
import feedList from '@/components/feedback/feedList'


//管理员
import login_1 from '@/components/admin/login'
import home_1 from '@/components/admin/home'
import page_1 from '@/components/admin/page'
import withdraw_history from '@/components/admin/withdraw_history'
import recharge_history from '@/components/admin/recharge_history'
import net_fund from '@/components/admin/net_fund'
import wallet_report from '@/components/admin/wallet_report'
import withdraw_audit from '@/components/admin/withdraw_audit'
import admin_transfer from '@/components/admin/admin_transfer'
import member_list from '@/components/admin/member_list'
import product_report from '@/components/admin/product_report'
import admin_feedback from '@/components/admin/admin_feedback'
import notice_list from '@/components/admin/notice_list'
import news_report from '@/components/admin/news_report'
import destroy_audit from '@/components/admin/destroy_audit'
import unusual_audit from '@/components/admin/unusual_audit'
import recommend_list from '@/components/admin/recommend_list'
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(mavonEditor)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {
          path: '/page',
          name: 'page',
          component: page
        },
          {
              path: '/mycount/infor',
              name: 'infor',
              component: infor
          },
          {
              path: '/mycount/wallet',
              name: 'wallet',
              component: wallet
          },
          {
              path: '/mycount/password',
              name: 'password',
              component: password,
          }
          ,
          {
              path: '/mycount/2_password',
              name: 'password1',
              component: password1
          },
          {
              path: '/mycount/phone',
              name: 'phone',
              component: phone
          },
          {
              path: '/mycount/transfer_accounts',
              name: 'accounts',
              component: accounts
          },
          {
              path: '/wallet/cash',
              name: 'cash',
              component: cash
          },
          {
              path: '/wallet/registerWallet',
              name: 'registerWallet',
              component: registerWallet
          },
          {
              path: '/wallet/MT4Wallet',
              name: 'MT4Wallet',
              component: MT4Wallet
          },
          {
              path: '/register/invite',
              name: 'invite',
              component: invite
          },
          {
              path: '/Deposit/deposit',
              name: 'deposit',
              component: deposit
          },
          {
              path: '/Deposit/depositRecord',
              name: 'depositRecord',
              component: depositRecord
          },
          {
              path: '/Gold/gold',
              name: 'gold',
              component: gold
          },
          {
              path: '/Gold/goldRecord',
              name: 'goldRecord',
              component: goldRecord
          },
          {
              path: '/product/buyMating',
              name: 'buyMating',
              component: buyMating
          },
          {
              path: '/product/buyList',
              name: 'buyList',
              component: buyList
          },
          {
              path: '/product/Rescission',
              name: 'Rescission',
              component: Rescission
          },
          {
              path: '/tip_lists',
              name: 'tip_lists',
              component: tip_lists
          },
          {
              path: '/feedback/feedback',
              name: 'feedback',
              component: feedback
          },
          {
              path: '/feedback/feedList',
              name: 'feedList',
              component: feedList
          }
      ]
    },
      {
          path: '/admin/login',
          name: 'login_1',
          component: login_1
      },{
          path: '/admin/home',
          name: 'home_1',
          component: home_1,
          children:[
              {
                  path: '/admin/page',
                  name: 'page_1',
                  component: page_1,
              },
              {
                  path: '/admin/withdraw_history',
                  name: 'withdraw_history',
                  component: withdraw_history,
              },
              {
                  path: '/admin/recharge_history',
                  name: 'recharge_history',
                  component: recharge_history,
              },
              {
                  path: '/admin/net_fund',
                  name: 'net_fund',
                  component: net_fund,
              },
              {
                  path: '/admin/wallet_report',
                  name: 'wallet_report',
                  component: wallet_report,
              },
              {
                  path: '/admin/withdraw_audit',
                  name: 'withdraw_audit',
                  component: withdraw_audit,
              },
              {
                  path: '/admin/admin_transfer',
                  name: 'admin_transfer',
                  component: admin_transfer,
              },
              {
                  path: '/admin/member_list',
                  name: 'member_list',
                  component: member_list,
              },
              {
                  path: '/admin/product_report',
                  name: 'product_report',
                  component: product_report,
              },
              {
                  path: '/admin/admin_feedback',
                  name: 'admin_feedback',
                  component: admin_feedback,
              },
              {
                  path: '/admin/notice_list',
                  name: 'notice_list',
                  component: notice_list,
              },
              {
                  path: '/admin/news_report',
                  name: 'news_report',
                  component: news_report,
              },
              {
                  path: '/admin/destroy_audit',
                  name: 'destroy_audit',
                  component: destroy_audit,
              },
              {
                  path: '/admin/unusual_audit',
                  name: 'unusual_audit',
                  component: unusual_audit,
              },
              {
                  path: '/admin/recommend_list',
                  name: 'recommend_list',
                  component: recommend_list,
              }
          ]
      },
  ]
})

