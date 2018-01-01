let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

let sql = 'SHOW DATABASES;';

connection.connect(function (error) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log("Connected!");

    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }

        console.log("Result: " + JSON.stringify(result));
    });
});


