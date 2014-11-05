'use strict';

/*
 * Bar Page Controller
 * client/js/controllers/
 * BarCtrl.js
 */

angular.module('BarCtrl', []).controller('BarController', function($scope, Bar) {

  Bar.getBar(function(BarInfo) {
    $scope.bar = BarInfo;
  });
});
