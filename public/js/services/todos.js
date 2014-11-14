angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http', function($http) {
		return {
			get : function(name) {
				return $http.get('/api/todos/' + name);
			},
			create : function(name, todoData) {
				return $http.post('/api/todos/' + name, todoData);
			},
			delete : function(name, id) {
				return $http.delete('/api/todos/' + name + '/' + id);
			}
		}
	}]);