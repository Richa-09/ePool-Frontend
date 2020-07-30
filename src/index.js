import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/login';
import Signup from './components/signup';
import Status from './components/status';
import Offerride from './components/offerRide';
import MyRides from './components/myRides';
import RideRequests from './components/myRequestPage';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const routing = (
  <BrowserRouter>
    <CookiesProvider>
         <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/home" component={App} />
         <Route exact path="/status" component={Status} />
         <Route exact path="/offerride" component={Offerride} />
         <Route exact path="/myrides" component={MyRides} />
         <Route exact path="/riderequests" component={RideRequests} />
    </CookiesProvider>
  </BrowserRouter>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
