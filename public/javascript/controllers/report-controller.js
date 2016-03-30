angular.module('EmployeeManagementSystem')
.controller('reportController', ['$scope', '$routeParams', 'Employee', function($scope, $routeParams, Employee){
	Employee.reports($routeParams.id)
	.success(function(data) {
		$scope.employees = data.employees;
	});
}]);