var scotchTodo = angular.module('scotchTodo', ['ngRoute', 'controllers', 'todoService', 'userService'])

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

scotchTodo.run(['$rootScope', '$window', function($rootScope, $window) {
	if($window.sessionStorage["user"]) {
		$rootScope.user = JSON.parse($window.sessionStorage["user"]);
		$rootScope.alreadyLogin = true;
	} else {	
		$rootScope.alreadyLogin = false;
	}
}]);
