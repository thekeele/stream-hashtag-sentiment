/*
 * Routes and Views to Render
 * client/js/
 * appRoutes.js
 */

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider.
    when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    }).
    when('/foo', {
      templateUrl: 'views/partials/foo.html',
      controller: 'FooController'
    }).
    when('/bar', {
      templateUrl: 'views/partials/bar.html',
      controller: 'BarController'
    }).
    otherwise({redirectTo: '/'});

  $locationProvider.html5Mode(true);

}]);
