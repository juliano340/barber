const express = require('express');
const app = express();
const port = 3000;

const db = require('./db'); // Importa a conexão com o banco de dados

const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));

var userAuthenticated = false;

// Configurar a sessão
app.use(session({
    secret: 'sua-chave-secreta',
    resave: false,
    saveUninitialized: true
}));



app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    username = req.session.username

    if (username) {
        res.render('index', { username });

    }
    else {
        // res.send('Faça login! <a href="/login">login</a>')
        res.render('bemvindo', { username });
    }
});

app.get('/login', (req, res) => {
    

    username = req.session.username

    if (username !== undefined) {
        res.redirect('/');

    }
    else {
        // res.send('Faça login! <a href="/login">login</a>')
        res.render('login', { username });
    }
});


app.get('/cadastro', (req, res) => {
    res.render('cadastro', {
        pageTitle: 'Página Login'
    });
});




//cadastro

app.post('/cadastro', async (req, res) => {


    const { nome, email, password } = req.body;

    let prosseguir = true;

    const consulta = `SELECT * FROM usuarios WHERE email = ?`;

    db.query(consulta, [email], async (err, resultados) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return;
        }

        if (resultados.length > 0) {
            console.log('O email existe no banco de dados.');
            const mensagem = 'O email existe no banco de dados.';
            if (prosseguir) {
                res.redirect('/cadastro?erro=jacadastrado')
                return;
            }
        } else {
            console.log('O email não existe no banco de dados.');

            try {
                // Gere um hash da senha usando bcrypt
                const hashedPassword = await bcrypt.hash(password, 10); // Use um número de rounds apropriado (10 é um valor comum)
                console.log(hashedPassword)

                // Insira o usuário no banco de dados com a senha hash

                const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
                db.query(query, [nome, email, hashedPassword]);
                // res.send('Usuário cadastrado com sucesso!');
                res.redirect('/cadastro?msg=sucesso')

            } catch (error) {
                console.error('Erro no cadastro do usuário:', error);
                res.status(500).send('Erro no cadastro do usuário.');
            }

        }

    });


});

// Rota para processar o formulário de login
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;




    const query = 'SELECT senha FROM usuarios WHERE email = ?';

    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados: ' + err.message);
            res.send('Erro na autenticação.');
        } else {
            if (results.length > 0) {
                const hashedPassword = results[0].senha;

                try {
                    // Comparar a senha fornecida com o hash no banco de dados
                    const match = await bcrypt.compare(password, hashedPassword);

                    if (match) {
                        // Senha válida, autenticação bem-sucedida
                        req.session.authenticated = true;
                        req.session.username = username;
                        console.log(username)
                        res.redirect('/');
                    } else {
                        // Senha inválida
                        res.redirect('/login?msg=invalid');
                    }
                } catch (error) {
                    console.error('Erro ao comparar hashes: ' + error.message);
                    res.send('Erro na autenticação.');
                }
            } else {
                // Usuário não encontrado
                res.redirect('/login?msg=invalid');
            }
        }
    });
});

// Rota para logout
app.get('/logout', (req, res) => {
    // Destruir a sessão para efetuar o logout
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout: ' + err.message);
        }
        res.redirect('/'); // Redirecionar para a página inicial ou outra página após o logout
    });
});

//TESTE


app.get('/users', (req, res) => {
    // Exemplo de consulta SQL

    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            return res.status(500).send('Erro na consulta SQL.');
        }

        // Processa os resultados e envia como resposta
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
