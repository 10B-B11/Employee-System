angular.module('EmployeeManagementSystem')
.controller('indexController', ['$scope','Employee', function($scope, Employee){
	Employee.showAll()
	.success(function(data){
		$scope.employees = data.employees;
	});



}]);