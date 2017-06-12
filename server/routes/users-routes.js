/*================================================================
Server side Routing
Route Definitions

Depending on the REST route/endpoint the PostgreSQL database 
is Queried appropriately.

PostgreSQL DB table name is: 'todos'
=================================================================*/

var pg = require('pg');

var database = require('../config/database.js');
var conString = database.conString;
var results = [];

function makeSessionId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


module.exports = {

	/*================================================================
	CREATE - $http post
	=================================================================*/
	//create user and send back all todos after creation
	createUser : function(req, res) {

		results = [];

		//Data to be saved to the DB - taken from $http request packet
		var data = {
			name : req.body.name,
			username: req.body.username,
			password:req.body.password
		};
	
  		// get a pg client from the connection pool
  		pg.connect(conString, function(err, client, done) {
   			client.query("INSERT INTO users (name,username, password) values($1, $2, $3)", [data.name, data.username, data.password]);

			var query = client.query("SELECT * FROM users ");

			
			//can stream row results back 1 at a time
			query.on('row', function(row) {
				results.push(row);
			});

			//fired after last row is emitted
			query.on('end', function() { 
				client.end();
				return res.json(results); // return all todos in JSON format  		
			});

			if(err)
				console.log(err);
   		});
    },
	/*================================================================
	READ - $http get
	=================================================================*/
	//Get all todos in the database
	authUser : function(req, res) {

		results = [];

		//console.log(req);
		var data = {
			username : req.body.username,
			password: req.body.password
		};

	
		var response={
			status: "wrong username or password"
		}

		// get a pg client from the connection pool
  		pg.connect(conString, function(err, client, done) {
   			
   			
			var query = client.query("SELECT * FROM users WHERE username=($1) and password=($2)", [data.username, data.password]);
			//can stream row results back 1 at a time
			console.log(query.anonymous);
			if(query.anonymous===undefined){
				results.push(response);
			}
			query.on('row', function(row) {
				console.log(row);
		      		results.push(row);
			});

			//fired after last row is emitted
			query.on('end', function() { 
			  client.end();
			  return res.json(results); // return all todos in JSON format
			});

			//console.log()
			if(err)
				console.log(err);

   		});
	}


}