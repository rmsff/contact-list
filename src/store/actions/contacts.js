import { contactsApi } from 'utils/api';
import { openNotification } from 'utils/helpers';

const Actions = {
	setContacts: items => ({
		type: 'CONTACTS:SET_ITEMS',
		payload: items,
	}),
	setIsLoading: isLoaing => ({
		type: 'CONTACTS:SET_IS_LOADING',
		payload: isLoaing,
	}),
	fetchContacts: () => (dispatch, setSubmitting) => {
		dispatch(Actions.setIsLoading(true));
		contactsApi
			.getAll()
			.then(({ data }) => {
				data.length > 0
					? dispatch(Actions.setContacts(data))
					: openNotification({
							message: 'Server do not provide information to display in the table.',
							duration: 8,
					  });
				dispatch(Actions.setIsLoading(false));
				setSubmitting(false);
			})
			.catch(err => {
				openNotification({
					type: 'error',
					message: 'Error receiving data',
				});
				dispatch(Actions.setIsLoading(false));
			});
	},
	setIsSubmiting: isSubmiting => ({
		type: 'CONTACTS:SET_IS_SUBMITING',
		payload: isSubmiting,
	}),
	setIsVisibleForm: isVisible => ({
		type: 'CONTACTS:SET_IS_VISIBLE_FORM',
		payload: isVisible,
	}),
	addContact: item => dispatch =>
		dispatch({
			type: 'CONTACTS:ADD_CONTACT',
			payload: item,
		}),
	submitContact: (contact, refForm) => dispatch => {
		dispatch(Actions.setIsSubmiting(true));
		contactsApi
			.create(contact)
			.then(({ data }) => {
				dispatch(Actions.addContact(data));
				openNotification({
					message: 'Contact added successfully',
					duration: 4,
				});
				dispatch(Actions.setIsSubmiting(false));
				dispatch(Actions.setIsVisibleForm(false));
				refForm.resetFields();
			})
			.catch(err => {
				openNotification({
					type: 'error',
					message: 'An error occurred while sending the data',
				});
				dispatch(Actions.setIsSubmiting(false));
				dispatch(Actions.setIsVisibleForm(false));
			});
	},
	editContact: ({ newItem, newData, setEditingKey }) => dispatch => {
		dispatch(Actions.setIsSubmiting(true));
		contactsApi
			.edit(newItem)
			.then(() => {
				openNotification({
					type: 'success',
					message: 'Сontact edited successfully',
					duration: 4,
				});
				dispatch(Actions.setContacts(newData));
				dispatch(Actions.setIsSubmiting(false));
				setEditingKey('');
			})
			.catch(err => {
				openNotification({
					type: 'error',
					message: 'An error occurred while sending the data',
				});
				dispatch(Actions.setIsSubmiting(false));
			});
	},
};

export default Actions;
