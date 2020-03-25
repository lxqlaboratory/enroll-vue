import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '系统通知', icon: 'dashboard', roles: ['18']}
    }]
    // meta: { title: '首页', icon: 'dashboard',roles: ['18'] }
  },
  {
    path: '/enroll',
    component: Layout,
    children: [{
      path: 'personInfomation',
      name: 'personInfomation',
      component: () => import('@/views/enroll/personInfomation'),
      meta: {title: '个人信息', icon: 'example', roles: ['8'] },
    }]

  },
  {
    path: '/enroll',
    component: Layout,
    children: [{
      path: 'enrollInstanceApply',
      name: 'enrollInstanceApply',
      component: () => import('@/views/enroll/enrollInstanceApply'),
      meta: {title: '申请报名', icon: 'example', roles: ['9'] },
    },
      {
        path: 'enrollinstaceitem',
        name: 'enrollinstaceitem',
        component: () => import('@/views/enroll/enrollinstaceitem'),
        hidden: true,
        meta: {title: '选择报名', icon: 'example' },
      },
      {
        path: 'enrollInstanceBaoming',
        name: 'enrollInstanceBaoming',
        component: () => import('@/views/enroll/enrollInstanceBaoming'),
        hidden: true,
        meta: {title: '报名', icon: 'example' },
      },
      {
        path: 'enrollInstanceSuc',
        name: 'enrollInstanceSuc',
        component: () => import('@/views/enroll/enrollInstanceSuc'),
        hidden: true,
        meta: {title: '报名成功', icon: 'example' },
      }
    ]

  },
  {
    path: '/enroll',
    component: Layout,
    children: [{
      path: 'enrollInstanceConfig',
      name: 'enrollInstanceConfig',
      component: () => import('@/views/enroll/enrollInstanceConfig'),
      meta: {title: '报名统计', icon: 'example', roles: ['6'] },
    }, {
      path: 'enrollConfigTwo',
      name: 'enrollConfigTwo',
      component: () => import('@/views/enroll/enrollConfigTwo'),
      hidden: true,
      meta: {title: '类型2统计信息', icon: 'example' },
    },
      {
        path: 'enrollConfigTwoDetail',
        name: 'enrollConfigTwoDetail',
        component: () => import('@/views/enroll/enrollConfigTwoDetail'),
        hidden: true,
        meta: {title: '编辑', icon: 'example' },
      }
    ]

  },
  {
    path: '/enroll',
    component: Layout,
    children: [{
      path: 'enrollInstanceManage',
      name: 'enrollInstanceManage',
      component: () => import('@/views/enroll/enrollInstanceManage'),
      meta: {title: '报名管理', icon: 'example', roles: ['7'] },
    },
      {
        path: 'enrollInstanceManageList',
        name: 'enrollInstanceManageList',
        component: () => import('@/views/enroll/enrollInstanceManageList'),
        hidden: true,
        meta: {title: '报名列表', icon: 'example' },
      },
      {
        path: 'enrollConfigTwoAdd',
        name: 'enrollConfigTwoAdd',
        component: () => import('@/views/enroll/enrollConfigTwoAdd'),
        hidden: true,
        meta: {title: '报名添加', icon: 'example' },
      },
      {
        path: 'enrollInstanceMangePerson',
        name: 'enrollInstanceMangePerson',
        component: () => import('@/views/enroll/enrollInstanceMangePerson'),
        hidden: true,
        meta: {title: '管理人员', icon: 'example' },
      }
    ]

  },

  { path: '/', redirect: '/login', hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
