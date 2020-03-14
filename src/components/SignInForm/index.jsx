import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateField } from 'utils/helpers';

import { connect } from 'react-redux';

const SignInForm = ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
	user: { isSubmitting },
}) => {
	const handleSubmitForm = event => {
		event.preventDefault();
		event.keyCode === 13 && handleSubmit(event);
	};
	return (
		<div className="auth">
			<div className="auth__header">
				<h2>Sign in</h2>
				<br />
				<p>Please enter your username and password</p>
			</div>
			<div className="auth__body">
				<Form onFinish={handleSubmit} className="signin-form">
					<Form.Item
						validateStatus={validateField('email', touched, errors)}
						help={touched.email && errors.email}
						hasFeedback>
						<Input
							onKeyUp={handleSubmitForm}
							disabled={isSubmitting}
							id="email"
							addonBefore={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder="E-mail"
							value={values.email}
							size="large"
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Form.Item>
					<Form.Item
						validateStatus={validateField('password', touched, errors)}
						help={touched.password && errors.password}
						hasFeedback>
						<Input
							onKeyUp={handleSubmitForm}
							disabled={isSubmitting}
							id="password"
							addonBefore={
								<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
							}
							type="password"
							placeholder="password"
							size="large"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Form.Item>
					<Form.Item>
						<Button disabled={isSubmitting} htmlType="submit" type="primary" size="large">
							Sign in
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default connect(({ user }) => ({ user }))(SignInForm);
