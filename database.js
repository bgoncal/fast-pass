var mp = require('mongodb-promise');
const mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
function getProduct(){

mp.mongoClient.connect(url)
    .then(function(db){
        return db.collection('products')
            .then(function(col) {
                return col.insert([{a : 1}, {a : 2}])
                    .then(function(result) {
                        console.log(result);
                        db.close().then(console.log('success'));
                    })
                })
            }).fail(function(err) {console.log(err);});

}


let db = {
    getProduct : getProduct
}

module.exports = db;