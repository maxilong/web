import Home from '@/views/home/index'
import Workbench from '@/views/workbench/index'
import App from '../App'
import SectionHighSeas from '@/views/crm/sectionHighSeas/index'
import Loadable from 'react-loadable'
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Loadable({
      loader: () => import('@/views/home/index'),
      loading: () => null
    }),
    hidden: true,
    meta: {
      title: '首页',
      icon: '',
      affix: true
    },
    children: []
  },
  {
    path: '/workbench',
    name: 'Workbench',
    component: Loadable({
      loader: () => import('@/views/workbench/index'),
      loading: () => null
    }),
    meta: {
      title: '工作台',
      icon: 'workbench',
      affix: true
    },
    hidden: false,
    children: []
  },
  {
    path: '/crm',
    name: 'Crm',
    meta: {
      title: '用户管理',
      icon: 'userCrm'
    },
    hidden: false,
    children: [
      {
        path: '/crm/sectionHighSeas',
        name: 'SectionHighSeas',
        component: Loadable({
          loader: () => import('@/views/crm/sectionHighSeas/index'),
          loading: () => null
        }),
        meta: {
          title: '部门公海'
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: Loadable({
      loader: () => import('@/views/workbench/index'),
      loading: () => null
    }),
    meta: {
      title: '产品管理',
      icon: 'product'
    },
    hidden: false,
    children: []
  }
]
export default routes