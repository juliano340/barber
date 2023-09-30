const express = require('express');
const app = express();
const port = 3000;

const db = require('./db'); // Importa a conexão com o banco de dados

const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: true }));



app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Página Inicial'
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        pageTitle: 'Página Login'
    });
});


app.get('/cadastro', (req, res) => {
    res.render('cadastro', {
        pageTitle: 'Página Login'
    });
});



app.get('/alert', (req, res) => {
    const mensagem = 'Esta é uma mensagem de alerta.';
    res.render('alert', { mensagem });
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
                res.send('Usuário cadastrado com sucesso!');
        
            } catch (error) {
                console.error('Erro no cadastro do usuário:', error);
                res.status(500).send('Erro no cadastro do usuário.');
            }

        }

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
