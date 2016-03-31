angular.module('EmployeeManagementSystem')
.controller('newController', ['$scope', '$location', 'Employee', function($scope, $location,Employee){
	$scope.add = function(employee) {
		// bug for default image
		if (employee.image === 'undefined') {
			employee.image = 'default.png';
		}
		Employee.add(employee)
		.success(function(data) {
			$location.path('/');
		})
	}

	Employee.showAll()
	.success(function(data) {
		$scope.managers = data.employees;
	})		
}])
