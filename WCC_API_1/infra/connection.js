const mysql = require('mysql');

const toConnect = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '124578',
    database: 'agendawcc' 
});

module.exports = toConnect;