/*
 * Rest Services for Bar
 * client/js/services/
 * BarService.js
 */

angular.module('BarService', []).service('Bar', function($http) {

  this.getBar = function(barInfo) {
    $http.get('/api/bar')
      .success(function(data) {
        console.log('Request: ' + data);
        barInfo(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

});
