const dataBase = require('../config/database').pool;

exports.createPost = async dadosPost => {
	const { rows } = await dataBase.query(
		`
	INSERT INTO posts 
	(
		posts_titulo,
		posts_pais,
		posts_fotografo,
		posts_usuario,
		posts_privado
	) 
	VALUES 
	(
		$1,
		$2,
		$3,
		$4,
		'false'
		) 
		RETURNING posts_id
		`,
		[
			dadosPost.titulo,
			dadosPost.pais,
			dadosPost.fotografo,
			dadosPost.usuario,
		]
	);

	return rows[0].posts_id;
};

exports.getPostById = async posts_id => {
	return await dataBase.query(`SELECT * FROM posts WHERE posts_id=$1`, [
		posts_id,
	]);
};

exports.getPostByFotografo = async posts_fotografo => {
	return await dataBase.query(
		'SELECT * FROM posts WHERE posts_fotografo like $1',
		[posts_fotografo]
	);
};

exports.getAllPost = async () => {
	return await dataBase.query(`SELECT * FROM posts`);
};

exports.updatePost = async (posts_id, dadosPost) => {
	return dataBase.query(
		`
	UPDATE posts SET 

		posts_titulo    = $1,
		posts_pais      = $2,
		posts_fotografo = $3,
		posts_privado   = $4

	WHERE 
		posts_id = $5 
	`,
		[
			dadosPost.titulo,
			dadosPost.pais,
			dadosPost.fotografo,
			dadosPost.privado,
			posts_id,
		]
	);
};

exports.deletePost = async posts_id => {
	await dataBase.query(`DELETE FROM posts WHERE posts_id=$1`, [posts_id]);
};
