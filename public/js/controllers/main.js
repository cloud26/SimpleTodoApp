angular.module('todoController', [])
	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			$scope.loading = true;

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;
			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}])
	
	.controller('userController', ['$scope', '$window', '$http', function($scope, $window, $http) {
		$scope.formData = {};
		// create a user after checking it
		$scope.message = '';
		$scope.user = null;
		$scope.alreadyLogin = false;
		if($window.sessionStorage["user"]) {
        	$scope.user = JSON.parse($window.sessionStorage["user"]);
        	$scope.alreadyLogin = true;
      	}
		$scope.register = function() {
			$http.post('/api/user/exist', $scope.formData)
			.success(function(user){
				if(user == undefined){
					$http.post('/api/user/register', $scope.formData)
					.success(function(user){
						$scope.formData = {};
						$window.sessionStorage["user"] = JSON.stringify(user);
						$scope.alreadyLogin = true;
						$window.location = '/';
					});
				} else {
					$scope.message = 'user already exist!';
				}
			});
		}

		$scope.login = function() {
			$http.post('/api/user/login', $scope.formData)
			.success(function(user){
				if(user == undefined) {
					$scope.message = 'credential error!';
				} else {
					$scope.formData = {};
					$window.sessionStorage["user"] = JSON.stringify(user);	
					$scope.alreadyLogin = true;	
					$window.location = '/';
				}
			});
		}
		$scope.logout = function() {
			$scope.alreadyLogin = false;
			$scope.user = undefined;
			$window.sessionStorage.removeItem('user');
		}
	}]);