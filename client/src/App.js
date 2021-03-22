import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/manager/Dashboard';
import Menus from './components/dashboard/customer/Menus';
import { Context } from './components/dashboard/customer/Context';
import './App.css';

import Overview from './components/Pages/Overview/Overview';
import {Reports, ReportsOne, ReportsTwo, ReportsThree} from './components/Pages/Reports/Reports';
import Revenue from './components/Pages/Revenue/Revenue';
import Users from './components/Pages/Users/Users';
import Analytics from './components/Pages/Analytics/analytics';
import Sidebar from './components/dashboard/manager/Sidebar';

//<PrivateRoute path='./././inventory' exact component={Inventory} />
//<PrivateRoute path='./././payroll' exact component={Payroll} />

//import Payroll from './components/Pages/Overview/Payroll';
//import Inventory from './components/Pages/Overview/Inventory';






// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = './login';
	}
}
export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Route exact path='/' component={Landing} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/customer/menu' component={Menus} />
					<Switch>
						<PrivateRoute exact path='/dashboard' component={Dashboard} />
						<Route path='/overview' exact component={Overview} />
						<PrivateRoute path='analytics/analytics' exact component={Analytics} />
						<Route path='/reports/reports' exact component={Reports} />
						<Route path='/Reports/Reports/ep' exact component={ReportsOne} />
						<Route path='/Reports/Reports/cs' exact component={ReportsTwo} />
						<Route path='/reports/reports/maintenance' exact component={ReportsThree} />
						<PrivateRoute path='/revenue/revenue' exact component={Revenue} />
						<PrivateRoute path='/users/users' exact component={Users} />
						<PrivateRoute exact path='/customer/menu' component={Menus} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}
