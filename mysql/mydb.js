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

    connection.query('CREATE TABLE IF NOT EXISTS products (id INT, name VARCHAR(255), PRIMARY KEY (id))', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("Table products created: " + JSON.stringify(result));
    });

    connection.query("CREATE TABLE IF NOT EXISTS users (id INT, name VARCHAR(255), favorite_product INT, PRIMARY KEY (id), " +
        "KEY `favorite_product` (`favorite_product`), " +
        "CONSTRAINT `fk_users_favorite_product` FOREIGN KEY (`favorite_product`) REFERENCES `products` (`id`))", function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("Table users created: " + JSON.stringify(result));
    });

    connection.query("SELECT COUNT(id) as productCount FROM products", function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(JSON.stringify(result));
        console.log(result[0].productCount);
        if (Number(result[0].productCount) === 0) {
            console.log("Products not exists");
            let insertProductsSql = "INSERT INTO products (id, name) VALUES ? ";
            let productValues = [
                [154, 'Chocolate Heaven'],
                [155, 'Tasty Lemons'],
                [156, 'Vanilla Dreams']
            ];
            connection.query(insertProductsSql, [productValues], function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log("Number of records inserted: " + result.affectedRows);
            });
        }
    });

    connection.query("SELECT COUNT(id) as usersCount FROM users", function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(JSON.stringify(result));
        console.log(result[0].usersCount);

        if (Number(result[0].usersCount) === 0) {
            console.log("Users not exists");
            let insertUsersSql = "INSERT INTO users (id, name, favorite_product) VALUES ? ";
            let userValues = [
                [1, 'John', 154],
                [2, 'Peter', 154],
                [3, 'Amy', 155],
                [4, 'Hannah', null],
                [5, 'Michael', null]
            ];

            connection.query(insertUsersSql, [userValues], function (error, result) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log("Number of records inserted: " + result.affectedRows);
            });
        }
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

    connection.query("SELECT users.name AS user, products.name AS favorite FROM users " +
        "JOIN products ON users.favorite_product = products.id", function (err, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(result);
    });
});

