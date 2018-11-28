/*
 * @File: router.config.js
 * @Project: fireleaf-react-scaffold
 * @File Created: Friday, 7th September 2018 5:57:23 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Friday, 7th September 2018 5:57:42 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2018 bairong, bairong
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
 * router config
 */
import Loadable from 'react-loadable';

import LoadingPage from '@/components/LoadingPage/';

// sync code splitting


const App = Loadable({
  loader: () => import('../pages/App/'),
  loading: LoadingPage,
  delay: 1000
});

const Home = Loadable({
  loader: () => import('../pages/Home/'),
  loading: LoadingPage,
  delay: 1000
});

const Todo = Loadable({
  loader: () => import('../pages/Todo/'),
  loading: LoadingPage,
  delay: 1000
});

// 表单页

const FormPage = Loadable({
  loader: () => import('../pages/FormPage/'),
  loading: LoadingPage,
  delay: 1000
});

const BaseForm = Loadable({
  loader: () => import('../pages/FormPage/BaseForm/'),
  loading: LoadingPage,
  delay: 1000
});

const ModalForm = Loadable({
  loader: () => import('../pages/FormPage/ModalForm/'),
  loading: LoadingPage,
  delay: 1000
});

const MapForm = Loadable({
  loader: () => import('../pages/FormPage/MapForm/'),
  loading: LoadingPage,
  delay: 1000
});

const Login = Loadable({
  loader: () => import('../pages/Login/'),
  loading: LoadingPage,
  delay: 1000
});

const NotFound = Loadable({
  loader: () => import('../pages/NotFound/'),
  loading: LoadingPage,
  delay: 1000
});

// routers
/**
 * {
 *    path: '',
 *    component: 组件,
 *    title: 导航文本（面包屑）,
 *    disabled: 禁止导航,
 *    openKey: 展开key,
 *    selectedKey: 选中key
 * }
 */
export default [
  {
    redirectUrl: '/app/home',
    exact: true,
    path: '/'
  },
  {
    path: '/app',
    component: App,
    title: '/',
    disabled: true,
    children: [
      {
        component: Home,
        title: '首页',
        path: '/app/home'
      },
      {
        component: Todo,
        title: 'todo',
        path: '/app/todo',
        selectedKey: '/app/todo'
      },
      {
        component: FormPage,
        title: '表单页',
        path: '/app/formpage',
        disabled: true,
        children: [
          {
            component: BaseForm,
            title: '基础表单',
            path: '/app/formpage/base',
            openKey: '/app/formpage',
            selectedKey: '/app/formpage/base'
          },
          {
            component: ModalForm,
            title: '表格表单',
            path: '/app/formpage/table-form',
            openKey: '/app/formpage',
            selectedKey: '/app/formpage/table-form'
          },
          {
            component: MapForm,
            title: '数据表单',
            path: '/app/formpage/map-form',
            openKey: '/app/formpage',
            selectedKey: '/app/formpage/map-form'
          }
        ]
      }
    ]
  },
  {
    component: Login,
    path: '/login'
  },
  {
    component: NotFound,
    path: '/404'
  },
  {
    component: NotFound
  }
];
