angular.module('EmployeeManagementSystem')
.controller('newController', ['$scope', 'Employee', function($scope, Employee){
	$scope.add = function(employee) {
		console.log('controller add:' + JSON.stringify(employee));
		Employee.add(employee)
		.success(function(data) {
			console.log(data);
		})
	}

	Employee.showAll()
	.success(function(data) {
		$scope.managers = data.employees;
	})		
}])
