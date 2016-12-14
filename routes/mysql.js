/**
 * Created by Chaitu on 12/6/2016.
 */
var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'sensor_cloud'
    });


connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;





