import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { contactAction } from 'store/actions';
import { ContactList, NewContact } from 'containers';
import './Contacts.scss';

const mapStateToProps = ({
	setIsVisibleForm,
	fetchContacts,
	contacts: { isLoading },
}) => ({
	setIsVisibleForm,
	fetchContacts,
	isLoading,
});
let isFirstRequest = true;

const ContactPage = ({ setIsVisibleForm, fetchContacts, isLoading }) => {
	if (isFirstRequest) {
		isFirstRequest = false;
		fetchContacts();
	}

	return (
		<div className="contacts">
			<div className="contacts__header">
				<Button size="large" onClick={() => setIsVisibleForm(true)} disabled={isLoading}>
					<PlusOutlined />
					Add new contact
				</Button>
				<NewContact />
			</div>
			<div className="contacts__body">
				<ContactList />
			</div>
		</div>
	);
};

export default connect(mapStateToProps, contactAction)(ContactPage);
