import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import APP from './App';
import UseStateAPI from './API/UseStateAPI.jsx'
import UseEffectAPI from './API/UseEffectAPI.jsx'
import UseMemoAPI from './API/UseMemoAPI.jsx'
import ToDoList from './TodoList/ToDoList'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ToDoList />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
