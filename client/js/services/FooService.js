/*
 * Rest Services for Foo
 * client/js/services/
 * FooService.js
 */

angular.module('FooService', []).service('Foo', function($http) {

  this.getFoo = function(fooInfo) {
    $http.get('/api/foo')
      .success(function(data) {
        console.log('Request: ' + data);
        fooInfo(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

});
