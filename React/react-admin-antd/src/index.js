import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './style/index.less';
import './icons'
import { Provider } from "react-redux";
import store from './store';



ReactDOM.render(  
  <Provider store={store}>
    <Page />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
