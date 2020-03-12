import { axios } from 'core';

export default {
	signIn: postData => axios.post('/signin', postData),
};
