const dataBase = require('../config/database').pool;

exports.createUser = async dadosUser => {
	const { rows } = await dataBase.query(
		`
	INSERT INTO users 
	(
		usr_nome,
		usr_sobrenome,
		usr_telefone,
		usr_username,
		usr_email,
		usr_senha
	) 
	VALUES 
	(

		$1,
		$2,
		$3,
		$4,
		$5,
		$6
	) 
	RETURNING usr_id
	`,
		[
			dadosUser.nome,
			dadosUser.sobrenome,
			dadosUser.telefone,
			dadosUser.username,
			dadosUser.email,
			dadosUser.senha,
		]
	);

	return rows[0].usr_id;
};

exports.updateUser = async (usr_id, dadosUser) => {
	return dataBase.query(
		`
	UPDATE users SET 
		usr_nome      = $1,
		usr_sobrenome = $2,
		usr_telefone  = $3,
		usr_username  = $4,
		usr_email     = $5 
	WHERE 
		usr_id =$6
	`,
		[
			dadosUser.nome,
			dadosUser.sobrenome,
			dadosUser.telefone,
			dadosUser.username,
			dadosUser.email,
			usr_id,
		]
	);
};

exports.deleteUser = async usr_id => {
	await dataBase.query(`DELETE FROM users WHERE usr_id=$1`, [usr_id]);
};

// Foi Removido para validar corretamente a senha com bcrypt
// exports.login = (login, senha) => {
// 	return dataBase.query(
// 		'SELECT x FROM users WHERE (usr_email=$1 OR usr_username=$1) AND usr_senha=$2',
// 		[login, senha]
// 	);
// };
