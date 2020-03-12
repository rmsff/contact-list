export default (key, touched, errors) =>
	(touched[key] && (errors[key] ? 'error' : 'success')) || '';
