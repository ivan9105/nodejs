let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;

let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(error, db) {
    if (error) throw error;
    console.log("Connected");

    let dbase = db.db("mydb");
    dbase.createCollection("customers", function(error, res) {
        if (error) throw error;
        console.log("Collection customer created!");
        console.log(res);
        db.close();
    });

});