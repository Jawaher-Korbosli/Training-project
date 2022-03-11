import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Provider as Web3Provider,
  Updater as Web3Updater,
} from "./contexts/Web3";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
     <Web3Provider>
     <App />
     <Web3Updater />
     </Web3Provider>
     <Web3Updater />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
