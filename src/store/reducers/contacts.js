const initialState = {
	items: [],
	isLoading: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'CONTACTS:SET_ITEMS':
			return {
				...state,
				items: payload,
				isLoading: false,
			};
		default:
			return state;
	}
};
