angular.module('EmployeeManagementSystem')
.controller('editController', ['$scope', '$routeParams','Employee', function($scope, $routeParams, Employee){
	Employee.show($routeParams.id)
	.success(function(data){
		$scope.employee = data.employee;
	})	

	
}])