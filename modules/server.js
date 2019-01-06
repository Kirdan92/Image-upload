var http = require('http');
var colors = require('colors');
var mime = require('mime-types');
var express = require('express');
var app = express();
var handlers = require('./handlers');

app.use(express.static('public'));



function start() {

//handler przed listenerem
  function onRequest(request, response) {
    console.log("Odebrano zapytanie.".green);
    console.log("Zapytanie " + request.url + " odebrane.");

    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

    switch (request.url) { 
        case '/':
        case '/start':
            handlers.welcome(request, response);
            break;
        case '/upload':
            handlers.upload(request, response);
            break;
        case '/show':
        	handlers.show(request, response);
        	break;
    	case '/styles':
        	handlers.styles(request, response);
        	break;
        default:
            handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(9000);

  console.log("Uruchomiono serwer!".green);
}

exports.start = start;

