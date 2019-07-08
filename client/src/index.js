import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './Resources/css/styles.css'
import Routes from './routes';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, 
  document.getElementById('root')
);
