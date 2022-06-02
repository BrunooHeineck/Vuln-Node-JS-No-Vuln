const router = require('express').Router();
const { errHandling } = require('../../utils/utils');
const { endpoints } = require('../../consts');
const userService = require('../../service/userService');

// {
// 	"req.query": {
// 			"nome": "nome",
// 			"sobrenome": "sobrenome",
// 			"telefone": "telefone",
// 			"username": "username",
// 			"email": "email",
// 			"senha": "senha",
// }

router.post(
	'/api/login',
	errHandling(async (req, res) => {
		const { email, senha } = req.body;
		const { rows, loginSucesso } = await userService.login(email, senha);

		if (loginSucesso) {
			const userInfo = rows[0];
			res.json({ redirect: '/', userInfo });
		} else {
			res.json({ redirect: '/login?loginerr' });
		}
	})
);

router.post(
	'/api/signup',
	errHandling(async (req, res) => {
		const { emailJaUtilizado, usernameJaUtilizado } =
			await userService.createUser(req.body);

		if (!emailJaUtilizado && !usernameJaUtilizado) {
			res.json({ redirect: '/login' });
		} else if (usernameJaUtilizado) {
			res.json({ redirect: '/signup?signup?usernameerr' });
		} else {
			res.json({ redirect: '/signup?signup?emailerr' });
		}
	})
);

module.exports = router;
