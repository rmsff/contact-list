import React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';
import { SignInForm } from 'containers';
import './Auth.scss';

const mapStateToProps = state => ({ isAuth: state.user.isAuth });

const Auth = ({ isAuth }) => {
	return (
		<div className="auth-page">
			<Route exact path={['/signin']} component={SignInForm} />
			{isAuth && <Redirect to="/contacts" />}
		</div>
	);
};

export default connect(mapStateToProps)(Auth);
