const Sequelize = require('sequelize');
const config = require('../../config');

const instacia = new Sequelize(
      config.get('mysql.database'),
      config.get('mysql.user'),
      config.get('mysql.password'),
      {
            host: config.get('mysql.host'),
            port: config.get('mysql.port'),
            dialect: 'mysql'
      }
);

module.exports = instancia;