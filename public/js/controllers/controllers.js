'use strict';

/*================================================
Module - for the Controllers
================================================ */
angular.module('postgreDbApp.controllers', [])

/**
 * Controller - MainCtrl
 */
.controller('MainCtrl', function($scope, $q, getTodosService, 
	createTodoService, updateTodoService, deleteTodoService,createUserService,authUserService,getTodosIdUserService) {

	$scope.formData = {};
	$scope.todos={};
	$scope.response={};
	$scope.user={};
	$scope.userResponse={};
	$scope.newUser={};

	$scope.logout = function(){
		$scope.response = {};
		$scope.userResponse={};
		$scope.user={};
	}

	$scope.createUser = function(name,userName,password){
			password=md5(password);

		createUserService.createUser(name,userName,password)
			.then(function(answer) {
	
				$scope.userResponse = answer;
				
			},
			function(error) {
				console.log("OOPS Error creating!!!! " + JSON.stringify(error));
			}
		);
	};

	$scope.authUser = function(username,password){

		var username=username;
		var pass=md5(password);


		authUserService.authUser(username,pass)
			.then(function(answer) {
				console.log(answer.len);
				if(answer.length==2){
					let id_user=answer[1].id;
					$scope.id_user=id_user;
				}
				$scope.response = answer;
			},
			function(error) {
				console.log("OOPS Error in authetication!!!! " + JSON.stringify(error));
			}
	  	);
		getTodosService.getTodos(username,pass)
					.then(function(answer) {
						
						$scope.todos = answer;
					},
					function(error) {
						console.log("OOPS!!!! " + JSON.stringify(error));
					}
			  	);
	/*
	 * Get Todos
	 */
	

	};



	/*
	 * Create a New Todo
	 */
	$scope.createTodo = function() {

		createTodoService.createTodo($scope.formData,$scope.id_user)
			.then(function(answer) {
				$scope.todos = answer;
			},
			function(error) {
				console.log("OOPS Error Creating Todo!!!! " + JSON.stringify(error));
			}
	  	);
	};


	/*
	 * Update a Todo
	 */
	$scope.editTodo = function(id, txt, isDone,id_user) {

		var updateData = {"text":txt, "done": isDone, "id_user":id_user};

		updateTodoService.updateTodo(id, updateData)
			.then(function(answer) {
				$scope.todos = answer;
			},
			function(error) {
				console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
			}
	  	);
	};


	/*
	 * Delete a Todo
	 */
	$scope.deleteTodo = function(id,id_user) 
	{
		var todoData={"id_user": id_user};
		console.log(todoData);
		deleteTodoService.deleteTodo(id,todoData)
			.then(function(answer) {
				$scope.todos = answer;
			},
			function(error) {
				console.log("OOPS Error Deleting!!!! " + JSON.stringify(error));
			}
	  	);
			getTodosIdUserService.getTodosIdUser(id_user)
					.then(function(answer) {
						
						$scope.todos = answer;
					},
					function(error) {
						console.log("OOPS!!!! " + JSON.stringify(error));
					}
			  	);

	};
});
