/*================================================================
	Server side Routing
	Route Declarations

=================================================================*/

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var todoRoutes = require('./routes/todo-routes.js');	//Exchange routes
var usersRoutes = require('./routes/users-routes.js');


module.exports = function(app) {

	/*================================================================
	ROUTES
	=================================================================*/
	app.post('/api/todos', todoRoutes.createTodo);
	app.post('/api/v1/todos', todoRoutes.getTodos);
	app.post('/api/v2/todos/', todoRoutes.getTodosIdUser);
	app.put('/api/todos/:todo_id', todoRoutes.updateTodo);
	app.delete('/api/todos/:todo_id', todoRoutes.deleteTodo);
	//users
		//user routes
	app.post('/api/users/', usersRoutes.authUser);
	//user routes
	app.post('/api/v1/users/', usersRoutes.createUser);
	
};