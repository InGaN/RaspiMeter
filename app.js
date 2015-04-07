// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    		= require('express');        // call express
var app        		= express();                 // define our app using express
var bodyParser 		= require('body-parser');
var mysql			= require('mysql');
var path			= require('path');
var tokenValidator 	= require("./controller/tokenValidator.js");

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.set('secretkey', CRED_SECRET_KEY);
app.set('username', CRED_USER_NAME);
app.set('password', CRED_PASS);


var connection = mysql.createConnection(
{
	host : CRED_DB_HOST,
	user : CRED_DB_USER,
	password : CRED_DB_PASS,
	database : CRED_DB_DATABASE
});
app.set('dbConnection', connection);

app.get('/gallery', function(req,res) {
	//res.render('gallery.html');
	res.render('gallery.html.ejs');
});
app.get('/login', function(req,res) {
	//res.render('gallery.html');
	res.render('login.html.ejs');
});
app.get('/', function(req,res) {
	//res.render('gallery.html');
	res.render('index.html.ejs');
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8092;        // set our port

/*
 * /api/login is the only route without auth, /api/login generates API key
 */
app.post('/api/login', require('./routes/auth.js').login);

// All other /api/* API request routing via JWT validation
app.all('/api/*', tokenValidator);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', require('./routes/index.js'));

// Static files
app.use(express.static(__dirname + '/statics'));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

