// 1. loading node modules by requiring them (remember to npm install them first!)
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

// 2. Setting up express
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded());
app.use(session({secret:"SecretKey"}));

// 3. Express routing
app.get('/', function(req,res){
	var users = [
		{name: "Kevin"},
		{name: "Eduardo"},
		{name: "Nate"},
		{name: "Patrick"}
	]
	if(req.session.message != undefined){
		var message = req.session.message;
	}else{
		var message = {content: ""};
	}
	res.render('home', {allUsers:users, theMessage: message});
});

app.post('/messages', function(req,res){
	console.log(req.body);
	req.session.message = req.body;
	res.redirect('/');
});


// 4. Start the server

app.listen(8000, function(){
	console.log("on port 8000");
})