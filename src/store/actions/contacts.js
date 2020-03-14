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
			})
			.catch(err => {
				if (err.response.status === 403) {
					openNotification({
						type: 'error',
						message: 'You are not autorized',
					});
					dispatch(Actions.setIsLoading(false));
					localStorage.removeItem('token');
					setTimeout(() => window.location.reload(), 2000);
				} else {
					openNotification({
						type: 'error',
						message: 'Error receiving data',
					});
				}
				return 'err';
			});
	},
	setIsSubmitting: isSubmitting => ({
		type: 'CONTACTS:SET_IS_SUBMITTING',
		payload: isSubmitting,
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
		dispatch(Actions.setIsSubmitting(true));
		contactsApi
			.create(contact)
			.then(({ data }) => {
				dispatch(Actions.addContact(data));
				openNotification({
					type: 'success',
					message: 'Contact added successfully',
					duration: 4,
				});
				dispatch(Actions.setIsSubmitting(false));
				dispatch(Actions.setIsVisibleForm(false));
				refForm.resetFields();
			})
			.catch(err => {
				openNotification({
					type: 'error',
					message: 'An error occurred while sending the data',
				});
				dispatch(Actions.setIsSubmitting(false));
				dispatch(Actions.setIsVisibleForm(false));
			});
	},
	editContact: ({ newItem, newContacts, setEditingKey }) => dispatch => {
		dispatch(Actions.setIsSubmitting(true));
		contactsApi
			.edit(newItem)
			.then(() => {
				openNotification({
					type: 'success',
					message: 'Сontact edited successfully',
					duration: 4,
				});
				dispatch(Actions.setContacts(newContacts));
				dispatch(Actions.setIsSubmitting(false));
				setEditingKey('');
			})
			.catch(err => {
				openNotification({
					type: 'error',
					message: 'An error occurred while sending the data',
				});
				dispatch(Actions.setIsSubmitting(false));
			});
	},
	removeContact: ({ id, newContacts, setDeletingKey }) => dispatch => {
		setDeletingKey(id);
		dispatch(Actions.setIsSubmitting(true));
		contactsApi
			.remove(id)
			.then(() => {
				openNotification({
					type: 'success',
					message: 'Сontact delited successfully',
					duration: 4,
				});
				dispatch(Actions.setContacts(newContacts));
				dispatch(Actions.setIsSubmitting(false));
				setDeletingKey('');
			})
			.catch(err => {
				openNotification({
					type: 'error',
					message: 'An error occurred while sending the data',
				});
				dispatch(Actions.setIsSubmitting(false));
				setDeletingKey('');
			});
	},
};

export default Actions;
