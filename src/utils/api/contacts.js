import { axios } from 'core';

export default {
	getAll: () => axios.get('/contacts'),
	create: postData => axios.post('/contacts', postData),
	edit: postData => axios.patch('/contacts/' + postData.id, postData),
	remove: id => axios.delete('/contacts/' + id),
};
