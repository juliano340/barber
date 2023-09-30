const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',      // Host do seu servidor MySQL
    user: 'root',    // Nome de usuário do banco de dados
    password: '',  // Senha do banco de dados
    database: 'dbbarber',  // Nome do banco de dados
    port: 3306              // Porta do servidor MySQL (geralmente 3306)
});

// Estabelece a conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso.');
});

module.exports = connection;