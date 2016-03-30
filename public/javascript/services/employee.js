angular.module('EmployeeManagementSystem')
.factory('Employee', ['$http', function($http){
	return{
		showAll: function() {
			return $http.get('/api/employee');
		},
		show: function(id) {
			return $http.get('/api/employee/' + id);
		},
		// Todo: it has bug
		add: function(employees) {
			console.log(employees);
			return $http.post('/api/employee/', employees);
		},
		// Todo: it has bug
		update: function(id, employee) {
			return $http.put('/api/employee/' + id, employee);
		},
		remove: function(id) {
			return $http.delete('/api/employee/' + id);
		},
		reports: function(id) {
			return $http.get('/api/employee/reports/' + id);
		}
	}
}])