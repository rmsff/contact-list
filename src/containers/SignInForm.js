import { withFormik } from 'formik';
import { SignInForm } from 'components';
import validateForm from 'utils/validate';
import { userActions } from 'store/actions';
import store from 'store/store';

const SignInFormContainer = withFormik({
	enableReinitialize: true,
	mapPropsToValues: () => ({
		email: '',
		password: '',
	}),
	validate: values => validateForm({ isAuth: true, values }),
	handleSubmit: (values, { setSubmitting }) => {
		store
			.dispatch(userActions.fetchUserSignIn(values))
			.then(() => {
				setSubmitting(false);
			})
			.catch(() => setSubmitting(false));
	},
	displayName: 'SignInForm',
})(SignInForm);

export default SignInFormContainer;
