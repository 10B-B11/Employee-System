angular.module('EmployeeManagementSystem')
.factory('Employee', ['$http', function($http){
	return{
		showAll: function() {
			return $http.get('/api/employee/');
		},
		show: function(id) {
			return $http.get('/api/employee/' + id);
		},
		add: function(employee) {
			console.log('service:' + JSON.stringify(employee));
			return $http.post('/api/employee', {'employee': employee});
		},
		// Todo: it has bug
		update: function(id, employee) {
			return $http.put('/api/employee/' + id, {'employee': employee});
		},
		remove: function(id) {
			return $http.delete('/api/employee/' + id);
		},
		reports: function(id) {
			return $http.get('/api/employee/reports/' + id);
		}
	}
}])