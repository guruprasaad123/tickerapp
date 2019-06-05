import React,{Component} from 'react';
import {render} from 'react-dom';
import Home from './home';
import Dashboard from './dashboard';

import Root from './routes';
import 'antd/dist/antd.css';
render(
<Home/>,
  document.getElementById('index')
);
