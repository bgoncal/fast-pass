const MongoClient = require('mongodb').MongoClient;
var express = require('express');
var mp = require('mongodb-promise');
var app = express();
var mydba = require("./database.js");
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');
var apiKey = "JVOTXPM7M3L30BQ1YGCI21FOKip045gyG6gv3MavLorA3J1U8";
var sharedSecret = "UORoW+yn5kCQJ6{UE}w8}{SuZ3Yh1wd38Cbw1GGh";

app.use(bodyParser.json());
// respond with "hello world" when a GET request is made to the homepage
app.listen(9001, function () {
 console.log("server running");
});


app.get('/sales/:email', function(req, res) {
	var email = req.params.email;
	console.log("Email =" +email);
	mp.MongoClient.connect(url)
    .then(function(db){
            return db.collection('sales')
                .then(function(col) {
                    return col.find({email : email}).toArray()
                        .then(function(items) {
                            console.log(items);
                             var json = JSON.stringify(items);
                            res.send(json);
                            db.close().then(console.log('success'));
                        })
            })
   
	}).fail(function(err) {console.log(err)});
});

app.get('/item/:id', function(req, res) {
	var productId = req.params.id;
	console.log("Product ID =" +productId);
	mp.MongoClient.connect(url)
    .then(function(db){
            return db.collection('products')
                .then(function(col) {
                    return col.find({barcode : productId}).toArray()
                        .then(function(items) {
                            console.log(items);
                             var json = JSON.stringify(items);
                            res.send(json);
                            db.close().then(console.log('success'));
                        })
            })
   
	}).fail(function(err) {console.log(err)});
});

app.post('/sale', function(req, res){
	var data = req.body;
	data.datetime = new Date();
	data.store = "Biachuello";
	data.storeImage = "https://drive.google.com/file/d/1gpY3iWGc1LPe5cvrd1VDNnZCYfgFvWFR/view";
    var callId = data.callId;

    mp.MongoClient.connect(url)
    .then(function(db){
            return db.collection('sales')
                .then(function(col) {
                   return col.insert(data)
                    .then(function(result) {
                        console.log(result);
                        db.close().then(console.log('success'));
                    })
                })
            })
	console.log(data);
	res.send(data);
});


app.get('/add/', function(req, res) {
	var params = req.params;
	var productId = params.id;
	mp.MongoClient.connect(url)
    .then(function(db){
            return db.collection('products')
                .then(function(col) {
                   return col.insert([{
		"id": "dasidoasguu1ebhjknfcsd",
		"barcode": "98141957293",
		"price": 254.75,
		"name": "Product 1",
		"image": "https:url1.com.br"
	},
	{
		"id": "dasidoasguu1ebhjknfcsd",
		"barcode": "43657284395243",
		"price": 254.75,
		"name": "Product 2",
		"image": "https:url1.com.br"
	}, {
		"id": "dasidoasguu1ebhjknfcsd",
		"barcode": "5763428852",
		"price": 254.75,
		"name": "Product 3",
		"image": "https:url1.com.br"
	}
])
                    .then(function(result) {
                        console.log(result);
                        db.close().then(console.log('success'));
                    })
                        })
            })
  
	res.send("OK");
   
});


