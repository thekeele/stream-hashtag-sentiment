'use strict';

/*
 * Foo Page Controller
 * client/js/controllers/
 * FooCtrl.js
 */

angular.module('FooCtrl', []).controller('FooController', function($scope, Foo) {

  Foo.getFoo(function(fooInfo) {
    $scope.foo = fooInfo;
  });
});
