import { combineReducers } from 'redux';

const reducers = ['contacts', 'user'];

export default combineReducers(
	reducers.reduce((initial, name) => {
		initial[name] = require(`./${name}`).default;
		return initial;
	}, {})
);
