const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.request = (endPoint, method, data) => {
	const URL_PADRAO = 'http://localhost:' + process.env.PORT;
	const url = `${URL_PADRAO}${endPoint}`;

	return axios({
		url,
		method,
		data,
		validateStatus: false,
	});
};

exports.clearCookies = (cookies, res, redirect) => {
	Object.keys(cookies).forEach(cookie => res.clearCookie(cookie));
	redirect && res.redirect(redirect);
};

exports.setCookies = (dados, res) => {
	const token = jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60,
			data: dados,
		},
		process.env.JWT_SECRET_KEY
	);
	res.cookie('token_jwt', token, {
		secure: true,
		httpOnly: true,
		sameSite: 'strict',
	});
};

exports.errHandling = fn => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

exports.escape = async unescapedString => {
	const regexChar = /[<>`'"&]/g;
	let arrayChar;
	let escapedString = unescapedString;

	while ((arrayChar = regexChar.exec(unescapedString)) !== null) {
		let foundChar = arrayChar[0];
		let charCode = foundChar.charCodeAt(0);

		if (foundChar === '&') foundChar = /&(?!#)/g;

		escapedString = escapedString.replace(foundChar, `&#${charCode};`);
	}
	return escapedString;
};

exports.verificaUserLogado = async token => {
	if (!token) {
		return false;
	}
	return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
		if (err) {
			console.log(err.name, err.message);
			return false;
		} else return decoded.data;
	});
};
