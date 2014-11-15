angular.module('userService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Users', ['$http', function($http) {
		return {
			exist : function(userData) {
				return $http.post('/api/user/exist',userData);
			},
			login : function(userData) {
				return $http.post('/api/user/login', userData);
			},
			register : function(userData) {
				return $http.post('/api/user/register', userData);
			}
		}
	}]);