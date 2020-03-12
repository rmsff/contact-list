import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { validateField } from 'utils/helpers';

export default ({
	values,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleSubmit,
	isSubmitting,
}) => {
	const handleSubmitForm = event => {
		event.preventDefault();
		event.keyCode === 13 && handleSubmit(event);
	}; // !!

	return (
		<div className="auth">
			<div className="auth__header">
				<h2>Sign in</h2>
				<br />
				<p>Please enter your username and password</p>
			</div>
			<div className="auth__body">
				<Form onSubmit={handleSubmit} className="signin-form">
					<Form.Item
						validateStatus={validateField('email', touched, errors)}
						help={touched.email && errors.email}
						hasFeedback>
						<Input
							onKeyUp={handleSubmitForm}
							disabled={isSubmitting}
							id="email"
							prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
							prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
							type="password"
							placeholder="password"
							size="large"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							disabled={isSubmitting}
							onClick={handleSubmit}
							type="primary"
							size="large">
							Sign in
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
