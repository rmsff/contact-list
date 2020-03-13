import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

export default ({
	onIsVisibleModal,
	isVisibleForm,
	isSubmiting,
	handleAddContactWrapper,
	validate,
}) => {
	const [form] = Form.useForm();
	const onAddContact = handleAddContactWrapper(form);

	const renderForm = () => {
		const layout = { labelCol: { span: 5 }, wrapperCol: { span: 16 } };
		return (
			<Form
				{...layout}
				form={form}
				name="new-contact"
				onFinish={onAddContact}
				validateMessages={validate}>
				<Form.Item name="firstName" label="First name" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="lastName" label="Last name" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="address" label="Address" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 10 }}>
					<Button loading={isSubmiting} type="primary" htmlType="submit" size="large">
						{isSubmiting ? ' Submiting' : 'Submit'}
					</Button>
				</Form.Item>
			</Form>
		);
	};

	return (
		<div className="new-contact">
			<Modal
				title={'Add new contact'}
				visible={isVisibleForm}
				onCancel={onIsVisibleModal}
				footer={null}>
				{renderForm()}
			</Modal>
		</div>
	);
};
