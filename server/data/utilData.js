const dataBase = require('../config/database').pool;

exports.clearAllUsers = async () => {
	await dataBase.query('DELETE FROM users');
};

exports.getUserById = async id => {
	return await dataBase.query(`SELECT * FROM users WHERE usr_id=$1`, [id]);
};

exports.getAllUsers = async () => {
	return await dataBase.query('SELECT * FROM users');
};

exports.getPostByTitulo = async post_titulo => {
	return await dataBase.query(
		`SELECT * FROM posts WHERE posts_titulo=$1`[post_titulo]
	);
};

exports.clearAllPosts = async () => {
	await dataBase.query('DELETE FROM posts');
};

exports.getUserByEmail = async email => {
	return await dataBase.query(`SELECT * FROM users WHERE usr_email=$1`, [
		email,
	]);
};

exports.getUserByUsername = async username => {
	return await dataBase.query(`SELECT * FROM users WHERE usr_username=$1`, [
		username,
	]);
};

exports.getUserByUsernameOrEmail = async usernameEmail => {
	return await dataBase.query(
		`SELECT users.usr_id, users.usr_admin, users.usr_username,  users.usr_senha  FROM users WHERE usr_username=$1 OR usr_email=$1`,
		[usernameEmail]
	);
};
