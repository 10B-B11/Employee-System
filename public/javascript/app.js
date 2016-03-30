angular.module('EmployeeManagementSystem',['ngRoute'])
.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'templates/home.html',
		controller: 'indexController',
	}).
	when('/edit/:id', {
		templateUrl: 'templates/edit.html',
		controller: 'editController'
	}).
	when('/new', {
		templateUrl: 'templates/new.html',
		controller: 'newController'
	}).
	when('/show/:id', {
		templateUrl: 'templates/show.html',
		controller: 'showController'
	}).
	when('/report/:id', {
		templateUrl: 'templates/home.html',
		controller: 'reportController'
	}).
	otherwise({
		redirectTo: '/index'
	});
}])

