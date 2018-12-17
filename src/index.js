/**
 * index 入口
 */

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
// 引入路由配置模块
import RouterList from './router/';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import {LocaleProvider, message} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import rootSaga from './sagas/';
import reducer from './store/';

import 'utils/xhr.config.js';
import './mock/'; // simulation data

import './style/index.less';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux 注入操作
const middleware = [sagaMiddleware];
const store = createStore(reducer, applyMiddleware(...middleware));
// console.log(store.getState());
sagaMiddleware.run(rootSaga);

// antd  全局配置
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});

const mountNode = document.getElementById('app'); // 设置要挂在的点

const hotRender = Component => ReactDom.render(
  <AppContainer>
    <Provider store={store}>
      <LocaleProvider locale={zhCN}>
        <Component />
      </LocaleProvider>
    </Provider>
  </AppContainer>
, mountNode);

hotRender(RouterList);

// console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
  if(module.hot) {
    module.hot.accept('./router/', () => {
      // https://github.com/gaearon/react-hot-loader/issues/511#issuecomment-288673129
      const RouterList = require('./router/').default;
      hotRender(RouterList);
    });
  } 
}

