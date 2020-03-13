import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Auth, Contacts } from './pages';
import './App.scss';

const mapStateToProps = state => ({ isAuth: state.user.isAuth });

const App = ({ isAuth }) => {
	const render = () => (isAuth ? <Contacts /> : <Redirect to="/signin" />);
	return (
		<div className="wrapper">
			<Switch>
				<Route exact path={['/signin']} component={Auth} />
				<Route path="/" render={render} />
			</Switch>
		</div>
	);
};

export default connect(mapStateToProps)(App);
