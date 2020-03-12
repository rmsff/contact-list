const initialState = {
	isAuth: !!window.localStorage.token,
};

export default (state = initialState, { type }) => {
	switch (type) {
		case 'USER:SET_DATA':
			return {
				...state,
				isAuth: true,
			};
		default:
			return state;
	}
};
