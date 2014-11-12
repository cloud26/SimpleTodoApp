var scotchTodo = angular.module('scotchTodo', ['ngRoute', 'todoController', 'todoService'])

scotchTodo.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainController'
		})

		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'userController'
		})
		
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'userController'
		});

	$locationProvider.html5Mode(true);
}]);