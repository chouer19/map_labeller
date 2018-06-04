var pool = require('./pool.js');

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();
        });
    });
}


