var fs = require('fs');
var formidable = require('formidable');
var mime = require('mime-types');

var express = require('express');
var app = express();
app.use(express.static('public'));


//USE EXPRESS

//Append file - upload html? 
exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "test.png");
       // response.writeHead(200, {"Content-Type": "text/html"});
       // response.write("Received image:<br/>");
       // response.write("<img src='/show' />");
       fs.readFile('templates/upload.html', function(err, html) {
       		if(err) { 
       			response.send(404); 
       			return false; 
       		}
	        	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
	        	response.write(html);
	   	 		response.end();
    	});
        
    });
}

exports.welcome = function(request, response) {
    if(err) { 
            response.send(404); 
            return false; 
    }
    console.log("Rozpoczynam obsługę żądania welcome.");
    console.log(request.url);

    fs.readFile('templates/start.html', function(err, html) {
    	response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    	response.write(html);
	 		response.end();
	});
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}

exports.show = function(request, response) {
	fs.readFile("test.png", "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
	});
}

//Style
exports.styles = function (request, response) {
	fs.readFile('css/style.css', function(err, css) {
		response.writeHead(200, {'Content-Type': 'text/css'});
		response.write(css);
		response.end();
	});
}
