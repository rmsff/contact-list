const initialState = {
	isAuth: !!window.localStorage.token,
	isSubmiting: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'USER:SET_DATA':
			return {
				...state,
				isAuth: true,
			};
		case 'USER:SET_IS_SUBMITING':
			return {
				...state,
				isSubmiting: payload,
			};
		default:
			return state;
	}
};
