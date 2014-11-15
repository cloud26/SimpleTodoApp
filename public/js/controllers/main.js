angular.module('controllers', [])
	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope', '$rootScope', '$http','Todos', function($scope, $rootScope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		if($rootScope.alreadyLogin){

			Todos.get($rootScope.user.name)
				.success(function(data) {
					$scope.todos = data;
					$scope.loading = false;
				});
		} else {
			$scope.loading = false;			
		}

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {
			$scope.loading = true;

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {

				// call the create function from our service (returns a promise object)
				Todos.create($rootScope.user.name, $scope.formData)

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
			Todos.delete($rootScope.user.name, id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}])
	
	.controller('userController', ['$scope', '$rootScope', '$window', '$http', 'Users', function($scope, $rootScope, $window, $http, Users) {
		$scope.formData = {};
		$scope.message = '';
		// create a user after checking it
		$scope.register = function() {
			Users.exist($scope.formData)
			.success(function(user){
				if(user == undefined){
					Users.register($scope.formData)
					.success(function(user){
						$scope.formData = {};
						$window.sessionStorage["user"] = JSON.stringify(user);
						$rootScope.alreadyLogin = true;
						$rootScope.user = user;
						$window.location = '/';
					});
				} else {
					$scope.message = 'user already exist!';
				}
			});
		}

		$scope.login = function() {
			Users.login($scope.formData)
			.success(function(user){
				if(user == undefined) {
					$scope.message = 'credential error!';
				} else {
					$scope.formData = {};
					$window.sessionStorage["user"] = JSON.stringify(user);	
					$rootScope.alreadyLogin = true;
					$rootScope.user = user;
					$window.location = '/';
				}
			});
		}
		$scope.logout = function() {
			$rootScope.alreadyLogin = false;
			$rootScope.user = null;
			$window.sessionStorage.removeItem('user');
			$window.location = '/';
		}
	}]);