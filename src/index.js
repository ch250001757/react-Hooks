import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import APP from './pages/App';
import UseStateAPI from './API/UseStateAPI.jsx'
import UseEffectAPI from './API/UseEffectAPI.jsx'
import UseMemoAPI from './API/UseMemoAPI.jsx'
import ToDoList from './TodoList/ToDoList'
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <APP />
    </Provider>
    {/* <ToDoList /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
