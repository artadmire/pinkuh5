import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: resolve => require(['@/pages/GoodsModule/Home'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }

    },
    {
      path: '/cart',
      name: 'Cart',
      component: resolve => require(['@/pages/MineModule/Cart'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/yearGoods',
      name: 'YearGoods',
      component: resolve => require(['@/pages/ActiveModule/YearGoods'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/special',
      name: 'Special',
      component: resolve => require(['@/pages/GoodsModule/Special'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: resolve => require(['@/pages/GoodsModule/GoodsDetail'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/MineModule/Login'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/editinginfo',
      name: 'Editinginfo',
      component: resolve => require(['@/pages/MineModule/Editinginfo'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/android',
      name: 'android',
      component: resolve => require(['@/pages/MineModule/Android'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/IOS',
      name: 'IOS',
      component: resolve => require(['@/pages/MineModule/IOS'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/submit_order',
      name: 'submit_order',
      component: resolve => require(['@/pages/OrderModule/Submit-order'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/paynow',
      name: 'Paynow',
      component: resolve => require(['@/pages/OrderModule/Paynow'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/payment_success',
      name: 'payment_success',
      component: resolve => require(['@/pages/OrderModule/Payment-success'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/payment_fail',
      name: 'payment_fail',
      component: resolve => require(['@/pages/OrderModule/Payment-fail'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/in_payment',
      name: 'InPayment',
      component: resolve => require(['@/pages/OrderModule/InPayment'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/NewAddr',
      name: 'NewAddr',
      component: resolve => require(['@/pages/MineModule/NewAddr'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/addrList',
      name: 'AddrList',
      component: resolve => require(['@/pages/MineModule/AddrList'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: resolve => require(['@/pages/MineModule/AddInvoice'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/invitefriends',
      name: 'Invitefriends',
      component: resolve => require(['@/pages/TaskCenterModule/InviteFriends'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/invitebounty',
      name: 'Invitionbounty',
      component: resolve => require(['@/pages/TaskCenterModule/InviteBounty'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/sharecoupon',
      name: 'Invitionbounty',
      component: resolve => require(['@/pages/TaskCenterModule/shareCoupon'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/commonproblem',
      name: 'Commonproblem',
      component: resolve => require(['@/pages/MineModule/CommonProblem'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/problems_see',
      name: 'ProblemsSee',
      component: resolve => require(['@/pages/MineModule/ProblemsSee'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    
    {
      path: '/active',
      name: 'Active',
      component: resolve => require(['@/pages/ActiveModule/Active'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/flow',
      name: 'Flow',
      component: resolve => require(['@/pages/GoodsModule/Flow'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/easy-paymentList',
      name: 'Easy-paymentList',
      component: resolve => require(['@/pages/GoodsModule/EasyPaymentList'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/newActive',
      name: 'newActive',
      component: resolve => require(['@/pages/ActiveModule/NewActive/'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/categories',
      name: 'Markets',
      component: resolve => require(['@/pages/GoodsModule/Markets'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/pintuan',
      name: 'pintuan',
      component: resolve => require(['@/pages/GoodsModule/PinTuan'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      },
    },
    {
      path: '/invoice_list',
      name: 'invoice_list',
      component: resolve => require(['@/pages/MineModule/invoiceList'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      },
    },
    {
      path: '/bountyhunter/home',
      name: 'introduce',
      component: resolve => require(['@/pages/BountyHunterModule/Home'], resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }, 
    },
    {
      path: '/bountyhunter/whitebar',
      name: 'whitebar',
      component: resolve => require(['@/pages/BountyHunterModule/WhiteBar'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/bountyhunter/payhunter',
      name: 'payhunter',
      component: resolve => require(['@/pages/BountyHunterModule/PayHunter'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/vip/home',
      name: "vip",
      component: resolve => require(['@/pages/VipModule/Home'], resolve),
      meta: {
        keepAlive: true // 不需要被缓存
      }, 
    },
    {
      path: '/vip/payvip',
      name: 'payvip',
      component: resolve => require(['@/pages/VipModule/PayVip'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/commonfriendsdownload',
      name: 'Commondownload',
      component: resolve => require(['@/pages/OtherModule/Commonfridensdownload'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/winning_list',
      name: 'WinningList',
      component: resolve => require(['@/pages/OtherModule/WinningList'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/noviceguide',
      name: 'Noviceguide',
      component: resolve => require(['@/pages/OtherModule/Noviceguide'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/bountyhunter/test',
      name: 'payhunter',
      component: resolve => require(['@/pages/BountyHunterModule/Test'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/bountydownload',
      name: 'Bountydownload',
      component: resolve => require(['@/pages/OtherModule/Bountydownload'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/remindfriends',
      name: 'Remindfriends',
      component: resolve => require(['@/pages/OtherModule/RemindFriends'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/makingmoneystrategy',
      name: 'Makingmoneystrategy',
      component: resolve => require(['@/pages/TaskCenterModule/Makingmoneystrategy'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
   
    {
      path: '/investigation',
      name: 'investigation',
      component: resolve => require(['@/pages/TaskCenterModule/Investigation'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/markets',
      name: 'markets',
      component: resolve => require(['@/pages/GoodsModule/Markets'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/SearchModule/Search'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/search_result',
      name: 'search_result',
      component: resolve => require(['@/pages/SearchModule/SearchResult'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path: '/withdraw_description',
      name: 'withdraw_description',
      component: resolve => require(['@/pages/OtherModule/WithdrawDescription'], resolve),
      meta: {
        keepAlive: false // 不需要被缓存
      }, 
    },
    {
      path:'*',
      redirect: '/'
    },

  ]
})
