SERVER > ROUTES > VIEW
SERVER > ROUTES > SERVICE > DATA;

SERVER => AS CONFIGURAÇÕES DO SERVIDOR;

ROUTES => MAPEADOS TODOS OS ENDPOINTS;
	ROUTES/ROUTER.JS => TODOS OS ENDPOINTS RESPOSAVEIS POR RENDERIZAR A VIEW;
	ROUTES/API => TODOS OS ENDPOINTS QUE SERÃO CHAMADOS PELO ROUTER.JS E DEVOLVEM AS INFORMAÇÕES SOLICITADAS;

VIEW => ARQUIVOS EJS PARA VISUALIZAÇÃO DAS PAGES

SERVICE => TODA A REGRA DE NÉGOCIO DA APLICAÇÃO, VALIDAÇÕES DEVEM FICAR AQUI;

DATA => EXECUTA A QUERY NO BANCO DE DADOS;

UTIL => PASTA DE FUNÇÕES UTEIS NO PROJETO;
	UTIL/UTILROUTER.JS => ENDPOINTS QUE NÃO ESTÃO EM PRODUCÃO MAS AUXILIAM NOS TESTES;

TEST => ARQUIVOS DE TESTES
	TEST/MOCK/FAKE => FUNCÃO QUE REALIZA O MOCK DOS DADOS;
	TEST/MOCK/FAKEROUTER.JS => ENDPOINTS QUE NÃO ESTÃO EM PRODUCÃO MAS AUXILIAM NOS TESTES COM DADOS MOCK;
	TEST/JENKINS.TEST.JS => SIMULA A ESTEIRA DO JENKINS, QUALITYGATE;
	TEST/TDD.TEST.JS => TEST DRIVEN DEVELOPMENT;

CONFIG => CONFIGURAÇÕES DO BANCO DE DADOS

||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

Consulta Parametrizada
node-postgres | Documentation | Queries
Exemplo1:
	const sqlSanitized = SELECT * FROM table WHERE column1=$1 AND column2=$2;
	dataBase.query(sqlSanitized, [value1, value2]);
Exemplo2:
	dataBase.query(SELECT * FROM table WHERE column1=$1 AND column2=$2, [value1, value2]);


Função para sanitizar os Dados que achei isso na internet para escapar os caracteres, mas nao esta funcionando, acho que algumas coisas estão faltando

	const regexChar = /[<>`'"&]/g;
	let arrayChar;
	let escapedString = unescapedString;

	while ((arrayChar = regexChar.exec(unescapedString)) !== null) {
		let foundChar = arrayChar[0];
		let charCode = foundChar.charCodeAt(0);

		if (foundChar === '&') foundChar = /&(?!#)/g;

		escapedString = escapedString.replace(foundChar, `&#${charCode};`);
	}
	


Exemplo de uso bcrypt
const bcrypt = require('bcrypt');

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
//Store hash in your password DB.

//Load hash from your password DB.
bcrypt.compareSync(myPlaintextPassword, hash); // true
bcrypt.compareSync(someOtherPlaintextPassword, hash); // false

Secure cookies
res.cookie(`Cookie token name`,`cookie string Value`,{
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });

Moelo do Banco de Dados

users (
	usr_id SERIAL PRIMARY KEY,
	usr_nome VARCHAR(100),
	usr_sobrenome VARCHAR(100),
	usr_telefone VARCHAR(14),
	usr_username VARCHAR(50),
	usr_email VARCHAR(100),
	usr_senha VARCHAR,
	usr_admin BOOLEAN,
);

posts (
	posts_id SERIAL,
	posts_titulo VARCHAR(100),
	posts_pais VARCHAR(50),
	posts_fotografo VARCHAR(50),	
	posts_usuario INTEGER,
	posts_privado BOOLEAN,	
);


