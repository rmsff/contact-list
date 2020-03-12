import { notification } from 'antd';

export default ({ type = 'info', message, description, duration = 3 }) =>
	notification[type]({
		message,
		description,
		duration,
	});
