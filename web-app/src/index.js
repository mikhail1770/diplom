import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./Components/App";
import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
       <App/>
     </Router>,
  document.getElementById('root')
);

reportWebVitals();
