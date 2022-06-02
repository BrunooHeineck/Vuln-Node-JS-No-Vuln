const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { response } = require('express');
const { endpoints } = require('../consts');
const postService = require('../service/postService');
const {
	setCookies,
	clearCookies,
	request,
	verificaUserLogado,
} = require('../utils/utils');

router.use(cookieParser());

const renderData = {
	//login
	formActionLogin: '/login',
	formMethodLogin: 'post',

	//Signup
	formActionSignup: '/signup',
	formMethodSignup: 'post',

	//CreatePost
	formActionCreatePost: '/createpost',
	formMethodCreatePost: 'post',

	endpointSignup: '/signup',
	endpointLogin: '/login',
	endPointLogout: '/?logout',
	endPointCreatePost: '/createpost',
	endpointPaginaInicial: '/',
};

router.get('/', async (req, res) => {
	const logout = req.url.endsWith(endpoints.logout);
	if (logout) clearCookies(req.cookies, res, '/');
	else {
		const { fotografo } = req.query;
		const { token_jwt } = req.cookies;
		const { usr_username, usr_admin } = await verificaUserLogado(token_jwt);
		const { rows } = await postService.getAllPost();
		const { data } = await request(
			`/api/postsbyfotografo?fotografo=${fotografo}`,
			'get',
			''
		);

		const post = fotografo ? data : rows;
		const logado = Boolean(usr_username);
		const admin = usr_admin ? 'true' : 'false';
		renderData.logado = logado;
		renderData.username = usr_username;
		renderData.posts = post;
		renderData.admin = admin;

		res.render('initial_page', renderData);
	}
});

router.get('/login', async (req, res) => {
	const { token_jwt } = req.cookies;
	const logado = await verificaUserLogado(token_jwt);
	const loginError = req.url.includes('loginerr');

	renderData.loginErrorMessage = loginError
		? 'Usuário ou senha inválidos'
		: '';

	logado ? res.redirect('/') : res.render('login', renderData);
});

router.get('/signup', async (req, res) => {
	const { token_jwt } = req.cookies;
	const logado = await verificaUserLogado(token_jwt);
	const emailErr = req.url.includes('emailerr');
	const usernameErr = req.url.includes('usernameerr');

	renderData.signupErrorMessage = emailErr
		? 'E-mail já cadastrado'
		: usernameErr
		? 'Username já cadastrado'
		: '';

	logado
		? res.redirect(endpoints.paginaInicial)
		: res.render('signup', renderData);
});

router.get('/createpost', async (req, res) => {
	const { token_jwt } = req.cookies;
	const logado = await verificaUserLogado(token_jwt);

	logado ? res.render('create_post', renderData) : res.redirect('/login');
});

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

router.post('/login', async (req, res) => {
	const { email, senha } = req.body;
	const { data } = await request(`/api/login`, 'post', { email, senha });

	if (data.userInfo) {
		clearCookies(req.cookies, res);
		setCookies(data.userInfo, res);
	}

	res.redirect(data.redirect);
});

router.post('/signup', async (req, res) => {
	const dados = req.body;
	const { data } = await request('/api/signup', 'post', dados);
	res.redirect(data.redirect);
});

router.post('/createpost', async (req, res) => {
	const { token_jwt } = req.cookies;
	const { usr_id } = await verificaUserLogado(token_jwt);

	const dados = req.body;
	if (dados.usuario === undefined) dados.usuario = usr_id;
	const { data } = await request(`/api/createpost`, 'post', dados);
	res.redirect(data.redirect);
});

module.exports = router;
