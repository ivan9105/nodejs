let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;

let url = "mongodb://localhost:27017/";

function insertOneCustomers(dbase, random) {
    let randromObj = {name: "Home" + (random ? Math.random() : ""), address: "Address" + (random ? Math.random() : "")};
    dbase.collection("customers").insertOne(randromObj, function (error, res) {
        if (error) throw error;
        console.log("Insert 1 obj");
        console.log(res);
    });
}

function insertOneUsers(dbase, random) {
    let randromObj = {name: "Home" + (random ? Math.random() : ""), address: "Address" + (random ? Math.random() : "")};
    dbase.collection("users").insertOne(randromObj, function (error, res) {
        if (error) throw error;
        console.log("Insert 1 obj");
        console.log(res);
    });
}

function insertOrder(dbase, product_id, status) {
    let obj = {product_id: product_id, status: status};
    dbase.collection("orders").insertOne(obj, function (error, res) {
        if (error) throw error;
        console.log("Insert 1 obj");
        console.log(res);
    });
}


function firstTimeout() {
    MongoClient.connect(url, function (error, db) {
        if (error) throw error;
        console.log("Connected");

        let dbase = db.db("mydb");
        dbase.createCollection("customers", function (error, res) {
            if (error) throw error;
            console.log("Collection customer created!");
            console.log(res);
        });

        insertOneCustomers(dbase, true);
        insertOneCustomers(dbase, true);
        insertOneCustomers(dbase, true);
        insertOneCustomers(dbase, true);
        insertOneCustomers(dbase, true);
        insertOneCustomers(dbase, false);
        insertOneCustomers(dbase, false);

        dbase.collection("customers").findOne({}, function (error, res) {
            if (error) throw error;
            console.log("Select 1 obj");
            console.log(res);
        });


        dbase.collection("customers").find({}).limit(5).toArray(function (error, res) {
            if (error) throw error;
            console.log("Select all obj-s");
            console.log(res);
        });

        let sort = {_id: 1};
        dbase.collection("customers").find().sort(sort).toArray(function (error, res) {
            if (error) throw error;
            console.log("Sort example");
            console.log(res);
        });

        let query = {address: "Address"};
        dbase.collection("customers").deleteOne(query, function (error, res) {
            if (error) throw error;
            console.log("Delete 1 obj");
            console.log(JSON.stringify(res));
        });

        query = {name: "Home"};
        let newValues = { $set: {"name": "Mickey", "address": "Canyon 123" } };
        dbase.collection("customers").updateOne(query, newValues, function (error, res) {
            if (error) throw error;
            console.log("1 document updated");
        });

        db.close();
    });
}

function secondTimeout() {
    MongoClient.connect(url, function (error, db) {
        if (error) throw error;
        console.log("Connected");

        let dbase = db.db("mydb");
        dbase.createCollection("users", function (error, res) {
            if (error) throw error;
            console.log("Collection users created!");
            console.log(res);
        });

        insertOneUsers(dbase, true);

        db.close();
    });
}

function thirdTimeout() {
    MongoClient.connect(url, function (error, db) {
        if (error) throw error;
        console.log("Connected");

        let dbase = db.db("mydb");
        dbase.collection("customers", function (error, collection) {
            if (error) throw error;
            collection.remove({},function(error, removed){
                if (error) throw error;
                console.log(removed);
            });
        });
        //Problem operation, db close throw exception after this, but code executed
        // dbase.collection("customers").drop();
        db.close();
    });
}

function fourthTimeout() {
    MongoClient.connect(url, function (error, db) {
        if (error) throw error;
        console.log("Connected");

        let dbase = db.db("mydb");
        dbase.createCollection("orders", function (error, res) {
            if (error) throw error;
            console.log("Collection orders created!");
            console.log(res);
        });

        insertOrder(dbase, 154, 1);

        db.close();
    });
}

function fifthTimeout() {
    MongoClient.connect(url, function (error, db) {
        if (error) throw error;
        console.log("Connected");

        let dbase = db.db("mydb");

        dbase.createCollection("products", function (error, res) {
            if (error) throw error;
            console.log("Collection products created!");
            console.log(res);
        });

        try {
            dbase.collection("products").update({_id: 154, name: 'Chocolate Heaven'}, {upsert: true});
            dbase.collection("products").update({_id: 155, name: 'Tasty Lemons'}, {upsert: true});
            dbase.collection("products").update({_id: 156, name: 'Vanilla Dreams'}, {upsert: true});
        } catch (ignore) {
        }
        db.close();
    });
}

setTimeout(firstTimeout, 0);
setTimeout(secondTimeout, 1500);
setTimeout(thirdTimeout, 3000);
setTimeout(fourthTimeout, 4500);
setTimeout(fifthTimeout, 6000);