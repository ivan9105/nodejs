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

MongoClient.connect(url, function(error, db) {
    if (error) throw error;
    console.log("Connected");

    let dbase = db.db("mydb");
    dbase.createCollection("customers", function(error, res) {
        if (error) throw error;
        console.log("Collection customer created!");
        console.log(res);
    });

    //Todo sep transaction
    // dbase.createCollection("users", function(error, res) {
    //     if (error) throw error;
    //     console.log("Collection users created!");
    //     console.log(res);
    // });

    insertOneCustomers(dbase, true);
    insertOneCustomers(dbase, true);
    insertOneCustomers(dbase, true);
    insertOneCustomers(dbase, true);
    insertOneCustomers(dbase, true);
    insertOneCustomers(dbase, false);
    /Todo sep transaction
    // insertOneUsers(dbase, true);

    dbase.collection("customers").findOne({}, function (error, res) {
        if (error) throw error;
        console.log("Select 1 obj");
        console.log(res);
    });


    dbase.collection("customers").find({}).toArray(function (error, res) {
        if (error) throw error;
        console.log("Select all obj-s");
        console.log(res);
    });

    let sort = { _id: 1 };
    dbase.collection("customers").find().sort(sort).toArray(function (error, res) {
        if (error) throw error;
        console.log("Sort example");
        console.log(res);
    });

    let query = { address: "Address"};
    dbase.collection("customers").deleteOne(query, function (error, res) {
        if (error) throw error;
        console.log("Delete 1 obj");
        console.log(JSON.stringify(res));
    });

    /Todo sep transaction
    // dbase.collection("customers").drop(function (error, res) {
    //    if (error) throw error;
    //    if (res) console.log("Collection customers deleted");
    // });

    db.close();
});