const data = require('../data/userData');
const utilService = require('../service/utilService');
const bcrypt = require('bcrypt');

// {
// 	"dadosUser": {
// 			"nome": "nome",
// 			"sobrenome": "sobrenome",
// 			"telefone": "telefone",
// 			"username": "username",
// 			"email": "email",
// 			"senha": "senha"
// }

exports.createUser = async dadosUser => {
	const {
		emailEncontrado: emailJaUtilizado,
		usernameEncontrado: usernameJaUtilizado,
	} = await validaEmailUsername(dadosUser.email, dadosUser.username);

	const userJaCadastrado = Boolean(emailJaUtilizado || usernameJaUtilizado);

	if (!userJaCadastrado)
		dadosUser.senha = bcrypt.hashSync(dadosUser.senha, 10);

	return userJaCadastrado
		? { usernameJaUtilizado, emailJaUtilizado }
		: await data.createUser(dadosUser);
};

exports.updateUser = async (usr_id, dadosUser) => {
	return await data.updateUser(usr_id, dadosUser);
};

exports.deleteUser = async usr_id => {
	await data.deleteUser(usr_id);
};

exports.login = async (email, senha) => {
	const { emailEncontrado, usernameEncontrado } = await validaEmailUsername(
		email
	);
	const userEncontrado = Boolean(emailEncontrado || usernameEncontrado);

	if (userEncontrado) {
		const { rows, rowCount } = await utilService.getUserByUsernameOrEmail(
			email
		);

		const senhaValida = bcrypt.compareSync(senha, rows[0].usr_senha);

		const loginSucesso = rowCount && senhaValida;

		delete rows[0].usr_senha;
		return { rows, loginSucesso };
	}

	return false;
};

async function validaEmailUsername(email, username = email) {
	const { rowCount: emailEncontrado } = await utilService.getUserByEmail(
		email
	);

	const { rowCount: usernameEncontrado } =
		await utilService.getUserByUsername(username);

	return { emailEncontrado, usernameEncontrado };
}
