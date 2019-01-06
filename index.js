var colors = require('colors');
var fs = require('fs');
var express = require('express');
var app = express();
var formidable = require('formidable');

app.use(express.static('public'));


app.get('/', function(request, response){
	response.sendFile(__dirname + '/templates/start.html');
});

app.get('/start', function(request, response){
	response.sendFile(__dirname + '/templates/start.html');
});
app.get('/upload', function(request, response){
	response.sendFile(__dirname + '/templates/upload.html');
});

app.post('/upload', function(request, response){
	console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
   		fs.renameSync(files.upload.path, "test.png");
   		console.log("Plik załadowany.".blue);
    	response.sendFile(__dirname + '/templates/upload.html');     
    });
});

app.get('/show', function(request, response){
	fs.readFile("test.png", "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
	});
});


const port = process.env.PORT || 9000;
app.listen(port, function(){
	console.log(colors.green('Listening on port ' + port));
});
