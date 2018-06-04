mysql = require('mysql');
config = require('../../conf/config.js')
pool = mysql.createPool(config);

module.exports = pool;
