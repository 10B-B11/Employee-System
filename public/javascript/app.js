angular.module('EmployeeManagementSystem',['ngRoute'])
.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'templates/home.html',
		controller: 'indexController'
	}).
	when('/edit', {
		templateUrl: 'templates/edit.html',
		controller: 'editController'
	}).
	when('/new', {
		templateUrl: 'templates/new.html',
		controller: 'newController'
	}).
	when('/show', {
		templateUrl: 'templates/show.html',
		controller: 'showController'
	}).
	otherwise({
		redirectTo: '/index'
	});
}])