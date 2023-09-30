const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
