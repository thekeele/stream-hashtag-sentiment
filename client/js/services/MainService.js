/*
 * Rest Services for Main
 * client/js/services/
 * MainService.js
 */

angular.module('MainService', []).service('Main', function($http) {

  this.getMain = function(mainInfo) {
    $http.get('/api')
      .success(function(data) {
        console.log('Request: ' + data);
        mainInfo(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

});
