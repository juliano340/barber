const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const db = require('./db'); // Importa a conexão com o banco de dados

const bcrypt = require('bcrypt');
const session = require('express-session');

const path = require('path');


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

var userAuthenticated = false;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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


// Cadastro Clientes
app.get('/cadastro-cliente', (req, res) => {
    

    const parametro = req.query.success


    
    console.log(parametro)


    username = req.session.username

    if (username) {
            
        res.render('cadastro-cliente', {parametro});

    }
    else {
        res.redirect('/');
    }
        
});

//CADASTRAR CLIENTE

// Rota POST para processar o formulário
app.post('/cadastro-cliente', async (req, res) => {

    try {

        
        const { nome, email, telefone, sexo } = req.body; // Supondo que os campos do formulário têm esses nomes

        if(email === '') {
            return;
        }
        // Insira os dados no banco de dados

        db.execute('INSERT INTO Clientes (Nome, Email, Telefone, Sexo) VALUES (?, ?, ?, ?)', [nome, email, telefone, sexo]);

        console.log('Registro inserido com sucesso!');
        
        // Redireciona para uma página de sucesso ou outra ação desejada
        
        res.redirect('/cadastro-cliente?success=true');

    } catch (error) {
        const mensagem = false;
        console.error('Erro ao inserir o registro:', error);
        // Lida com erros de inserção, redireciona para uma página de erro ou outra ação desejada
        res.send('Erro ao inserir registro!');
    }
    
    
    
});



// Rota para processar a pesquisa e enviar uma resposta JSON
app.post('/pesquisar', async (req, res) => {
    // Recupere o termo de pesquisa do formulário
    const termo = req.body.email;
    console.log('----')
    console.log(termo)

    // Consulta SQL para buscar clientes com base no termo (email ou telefone)
    const sql = `SELECT * FROM clientes WHERE email LIKE ? OR telefone LIKE ?`;
    const searchTerm = `%${termo} %`; // Use `%` para corresponder a qualquer parte do email ou telefone

    // Execute a consulta SQL usando o mysql2
    db.query(sql, [searchTerm, searchTerm], (err, resultados) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            // Lide com o erro de acordo com suas necessidades
            console.log('SUCESSO!')
            res.status(500).json({ erro: 'Erro ao consultar o banco de dados' });
        } else {
            // Envie os resultados como resposta JSON
            console.log(resultados)
            res.json(resultados);
        }
    });
});



app.post('/enviar-email', (req, res) => {
    
    const email = req.body.termo;
  
    // Aqui, você pode fazer o que quiser com o e-mail
    console.log(`E-mail recebido: ${email}`);
  
    // Você pode responder ao cliente com uma mensagem de confirmação
    const consulta = 'SELECT * FROM clientes WHERE email LIKE ? OR telefone LIKE ?';

    const termoPesquisaLike = `%${email}%`;
    console.log(termoPesquisaLike);
    

    db.query(consulta, [termoPesquisaLike, termoPesquisaLike], (err, results) => {
        if (err) {
          console.error('Erro na consulta ao banco de dados:', err);
          res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
          return;
        }
    
        // Retorna os resultados como JSON
        res.json({ data: results });
  });

})