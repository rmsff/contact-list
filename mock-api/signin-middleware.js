module.exports = (req, res, next) => {
	const token = 'eyJkYXRhIjp7IiRfXyI6eyJ';
	const authorizedPath = ['/contacts'];

	if (req.method === 'POST' && req.path === '/signin') {
		if (req.body.email === 'demo@mail.com' && req.body.password === 'Demo111') {
			res.json({ token, status: 'success' });
		} else {
			res.json({ message: 'wrong password', status: 'error' });
		}
		return;
	}

	if (authorizedPath.includes(req.path)) {
		if (req.headers.token === token) {
			next();
		} else {
			res.status(403).json({ message: 'You are not autorized' });
		}
		return;
	}

	next();
};
