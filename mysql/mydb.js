let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log("Connected!");
    connection.query("CREATE DATABASE IF NOT EXISTS mydb", function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("Database mydb created: " + JSON.stringify(result));
    });
});
connection.end();

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
        throw error;
    }

    connection.query("CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))", function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("Table customers created: " + JSON.stringify(result));
    });


    connection.query("INSERT INTO customers (name, address) VALUES ('Company Inc " + Math.random() + "', 'Highway " + Math.random() + "')", function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("1 record inserted " + JSON.stringify(result));
    });

    let insertValuesSql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
        ['Sandy' + Math.random(), 'Ocean blvd ' + Math.random()],
        ['Betty' + Math.random(), 'Green Grass ' + Math.random()]
    ];

    connection.query(insertValuesSql, [values], function (err, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("Number of records inserted: " + result.affectedRows);
    });

    connection.query("SELECT * FROM CUSTOMERS", function (err, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(result);
        console.log('--------------------------------------------------');
    });

    let name = '%Company%';
    let address = '%Highway%';
    let whereSql = 'SELECT * FROM customers WHERE name LIKE ? OR address = ?';
    connection.query(whereSql, [name, address], function (err, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(result);
        console.log('--------------------------------------------------');
    });

    connection.query("DELETE FROM customers WHERE address = 'Mountain 21'", function (err, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("Number of records deleted: " + result.affectedRows);
    });
});

