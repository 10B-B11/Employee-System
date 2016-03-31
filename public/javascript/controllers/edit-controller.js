angular.module('EmployeeManagementSystem')
.controller('editController', ['$scope', '$routeParams', '$location','Employee', function($scope, $routeParams, $location,Employee){
	Employee.show($routeParams.id)
	.success(function(data){
		$scope.employee = data.employee;
		$scope.employee.StartDate = new Date($scope.employee.StartDate);
	})	

	$scope.update = function(id, employee) {
		Employee.update(id, employee)
		.success(function(data){
			$location.path('/show/' + id);	
		})
	}
}])