const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoURL = "mongodb://dbUser:dbPassword@ds155428.mlab.com:55428/getir-bitaksi-hackathon"

app.use(bodyParser.json());

//Error handler for database failures.
function handleDatabaseFail(response) {
    response.statusCode = 500;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Database Connection Failed\n');
}

//Error handler for illegal arguments in POST requests.
function handleIllegalArgument(request, response) {
    response.statusCode = 400;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Illegal Arguments for ' + request.method + ' request in this URL.\n');
}

//Error handler for no results.
function handleNoResults(response) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/plain');
    response.end('No Results.\n');
}

//Finds the record in the database
function findRecord(database, key, response){
    var cursor =database.collection('records').findOne( { "key": key },
    function(error, doc) {
        if (error != null) {
            handleDatabaseFail(response)
        }
        if (doc != null) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end('{"key": "'+doc.key+'", "value": "'+doc.value+'", "createdAt": "'+doc.createdAt+'"}\n');
        } else {
            handleNoResults(response);
        }
    });
}

//POST endpoint handler
app.post('/getRecord',function(request, response){
    var key=request.body.key;
    if (key == undefined) {
        handleIllegalArgument(request, response);
    }
    else {
        MongoClient.connect(MongoURL, function(error, database) {
            if (!error) {
                findRecord(database, key, response)
            }
            else {
                handleDatabaseFail(response)
            }
        })
    }
});

//Starts HTTP Server
var server = app.listen(process.env.PORT || 3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("App listening at http://%s:%s", host, port)
})
