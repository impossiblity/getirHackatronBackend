# getirHackatronBackend
Preliminary Backend Task for Getir Hackatron

## Introduction
This **node.js** program creates a simple web server with a single endpoint. It takes a key from a POST request and returns the query result from an external database.

It is deployed at https://kaan-getir-backend.herokuapp.com/getRecord.

## Example Usage
```curl -H "Content-Type: application/json" -X POST -d '{"key":"chp8vgSkJDbyDKAS"}' http://kaan-getir-backend.herokuapp.com/getRecord -i```

## Packages Used
* http
* express
* mongodb
* body-parser
