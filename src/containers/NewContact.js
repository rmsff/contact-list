import React from 'react';
import { connect } from 'react-redux';

import { contactAction } from 'store/actions';
import { NewContact } from 'components';

const mapStateToProps = ({
	setIsVisibleForm,
	submitContact,
	contacts: { isSubmitting, isVisibleForm },
}) => ({
	setIsVisibleForm,
	isVisibleForm,
	isSubmitting,
	submitContact,
});

const NewContactContainer = ({
	setIsVisibleForm,
	isVisibleForm,
	isSubmitting,
	submitContact,
}) => {
	const handleIsVisibleModal = () => {
		setIsVisibleForm(!isVisibleForm);
	};

	const handleAddContactWrapper = refForm => values => {
		submitContact(values, refForm);
	};
	const validate = {
		required: 'This field is required!',
		types: { email: 'Not a validate email!' },
	};
	return (
		<NewContact
			onIsVisibleModal={handleIsVisibleModal}
			isVisibleForm={isVisibleForm}
			isSubmitting={isSubmitting}
			handleAddContactWrapper={handleAddContactWrapper}
			validate={validate}
		/>
	);
};

export default connect(mapStateToProps, contactAction)(NewContactContainer);
