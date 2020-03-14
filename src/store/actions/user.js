import { userApi } from 'utils/api';
import { openNotification } from 'utils/helpers';
import { axios } from 'core';

const Actions = {
	fetchUserSignIn: postData => dispatch => {
		dispatch({ type: 'USER:SET_IS_SUBMITING', payload: true });

		userApi
			.signIn(postData)
			.then(({ data }) => {
				const { token, status } = data;
				if (status === 'success') {
					window.localStorage['token'] = token;
					axios.defaults.headers.common['token'] = token;
					dispatch({ type: 'USER:SET_DATA' });
					openNotification({
						type: 'success',
						message: 'You are successfully logged in',
					});
				} else {
					openNotification({
						type: 'error',
						message: 'Authorization error',
						description: 'Invalid username or password',
					});
				}
				dispatch({ type: 'USER:SET_IS_SUBMITING', payload: false });
			})
			.catch(() =>
				openNotification({
					type: 'error',
					message: 'Server error',
				})
			);
	},
};

export default Actions;
