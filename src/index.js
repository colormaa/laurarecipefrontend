import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import setAuthToken from './actions/utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import jwt_decode from  'jwt-decode';
import {Provider} from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
  
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now()/1000;
    if(decoded.exp < currentTime){
      store.dispatch(logoutUser())
      window.location.href = '/login';
      
    }
  }
  const appmain = (
    <Provider store = {store}>
    <Router>
        <App />
    </Router>
  </Provider>
  );
ReactDOM.render(appmain, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
