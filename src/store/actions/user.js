import { userApi } from 'utils/api';
import { openNotification } from 'utils/helpers';

const Actions = {
	fetchUserSignIn: postData => dispatch => {
		return userApi.signIn(postData).then(({ data }) => {
			const { token, status } = data;
			if (status === 'success') {
				window.localStorage['token'] = token;
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
			return data;
		});
	},
};

export default Actions;
