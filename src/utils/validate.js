export default ({ isAuth, values }) => {
	let errors = {};

	const mapping = {
		email: value => {
			if (!value) {
				errors.email = 'Enter your E-mail address';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
				errors.email = 'Invalid E-mail address';
			}
		},
		password: value => {
			if (!value) {
				errors.password = 'Enter the password';
			} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/.test(value)) {
				errors.password = isAuth
					? 'Invalid password. Try again.'
					: 'The password must consist of at least 8 characters and contain at least one uppercase letter or number.';
			}
		},
	};

	Object.keys(values).forEach(key => mapping[key] && mapping[key](values[key]));

	return errors;
};
