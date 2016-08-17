'use strict';

// Declare app level module which depends on views, and components
angular.module('dailyGrinds').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
	$routeProvider.
	  when('/calendar', {
	    template: '<calendar-view></calendar-view>'
	  }).
		when('/details/:localeDate', {
			template: '<detail-view></detail-view>'
		}).
		otherwise('/calendar');
}]);


