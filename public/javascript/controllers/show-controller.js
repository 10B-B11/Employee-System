angular.module('EmployeeManagementSystem')
.controller('showController', ['$scope', '$routeParams', '$location','Employee', function($scope, $routeParams, $location, Employee){
	Employee.show($routeParams.id)
	.success(function(data){
		$scope.employee = data.employee;
	});

	Employee.reports($routeParams.id)
	.success(function(data) {
		$scope.report_to = data.employees;
	});

	$scope.delete = function(id) {
		Employee.remove(id)
		.success(function(data){
			$location.path('/');
		})
	}
}]);