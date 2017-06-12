/*================================================
Ref.
https://docs.angularjs.org/api/ng/service/$q
https://github.com/kriskowal/q
http://www.benlesh.com/2013/02/angularjs-creating-service-with-http.html
http://andyshora.com/promises-angularjs-explained-as-cartoon.html
================================================ */

'use strict';
/*================================================
Module - for the Services
================================================ */
angular.module('postgreDbApp.services', [])

/*
**Create user
*/
.factory('createUserService',function($http,$q){
    var createUser = function (name,username,password){


      var deferred = $q.defer();
        var userData = {"name": name,"username": username, "password": password};
   
        $http.post('/api/v1/users/', userData)
        .success(function(data) {
            deferred.resolve(data);
        })
        .error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    return {
        createUser: createUser
    };


})
/**
 *authUser
 */
 .factory('authUserService',function($http,$q){

    /*================================================================
    READ - $http get
    =================================================================*/
    var authUser = function(username,pass) {

        var deferred = $q.defer();
        var userData = {"username":username, "password": pass};
   
        $http.post('/api/users/', userData)
        .success(function(data) {
           
            deferred.resolve(data);
        })
        .error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }
    return {
        authUser: authUser
    }

 })
/**
 * getTodos - Factory Service
 */
.factory('getTodosService', function($http, $q) {

	/*================================================================
	READ - $http get
	=================================================================*/
	var getTodos = function(username,password) {
	    
    	var deferred = $q.defer();
        var data={"username":username, "password": password};
        $http.post('/api/v1/todos/',data)
        .success(function(data) {
       
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        getTodos: getTodos
    };
})

/**
 * getTodos - Factory Service
 */
.factory('getTodosIdUserService', function($http, $q) {

    /*================================================================
    READ - $http get
    =================================================================*/
    var getTodosIdUser = function(id_user) {
        
        var deferred = $q.defer();
        var data={"id_user":id_user};
        
        $http.post('/api/v2/todos/',data)
        .success(function(data) {
       
            deferred.resolve(data);
        })
        .error(function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        getTodosIdUser: getTodosIdUser
    };
})



/**
 * Create Todo - Factory Service
 */
.factory('createTodoService', function($http, $q) {

	/*================================================================
	CREATE - $http post
	=================================================================*/
	var createTodo = function(todo,id_user) {
    	var deferred = $q.defer();
        var data = {"text":todo.text, "id_user": id_user};

        $http.post('/api/todos/', data)
        .success(function(data) {
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        createTodo: createTodo
    } 
})



/**
 * Update Todo - Factory Service
 */
.factory('updateTodoService', function($http, $q) {

	/*================================================================
	UPDATE - $http put
	=================================================================*/
	var updateTodo = function(id, updateData) {
	    console.log(updateData);
    	var deferred = $q.defer();

        $http.put('/api/todos/' + id, updateData)
        .success(function(data) {
        	console.log("Success");//TEST
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	console.log("Error");//TEST        	
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        updateTodo: updateTodo
    } 
})


/**
 * Delete Todo - Factory Service
 */
.factory('deleteTodoService', function($http, $q) {

	/*================================================================
	DELETE - $http delete
	=================================================================*/
	var deleteTodo = function(id,todoData) {
	    
    	var deferred = $q.defer();
        console.log("todoData->"+todoData);

        $http.delete('/api/todos/' + id, todoData)        
        .success(function(data) {
        	deferred.resolve(data);
        })
        .error(function(reason) {
        	deferred.reject(reason);
        });
        return deferred.promise
    }

    //Return Factory Object
    return {
        deleteTodo: deleteTodo
    } 
});
