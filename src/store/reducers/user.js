const initialState = {
	isAuth: !!window.localStorage.token,
	isSubmitting: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'USER:SET_DATA':
			return {
				...state,
				isAuth: payload,
			};
		case 'USER:SET_IS_SUBMITTING':
			return {
				...state,
				isSubmitting: payload,
			};
		default:
			return state;
	}
};
