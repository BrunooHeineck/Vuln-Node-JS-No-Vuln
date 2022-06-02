const data = require('../data/postData');
const { escape } = require('../utils/utils');

// {
// 	"dadosPost": {
// 		"titulo": "titulo",
// 		"pais": "pais",
// 		"usuario": "usuario",
// 		"fotografo": "fotografo"
// 	}
// }

exports.createPost = async dados => {
	dados.titulo = await escape(dados.titulo);
	dados.pais = await escape(dados.pais);
	dados.fotografo = await escape(dados.fotografo);
	return await data.createPost(dados);
};

exports.getAllPost = async () => {
	return await data.getAllPost();
};

exports.getPostById = async posts_id => {
	return await data.getPostById(posts_id);
};

exports.getPostByFotografo = async posts_fotografo => {
	return await data.getPostByFotografo(posts_fotografo);
};

exports.updatePost = async (posts_id, dados) => {
	return await data.updatePost(posts_id, dados);
};

exports.deletePost = async posts_id => {
	await data.deletePost(posts_id);
};
