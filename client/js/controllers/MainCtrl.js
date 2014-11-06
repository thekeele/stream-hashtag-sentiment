'use strict';

/*
 * Main Page Controller
 * client/js/controllers/
 * MainCtrl.js
 */

angular.module('MainCtrl', []).controller('MainController', function($scope, Main) {

  Main.getMain(function(mainInfo) {
    $scope.main = mainInfo[0];
  });

  Main.getSocket(function(tweets) {
    $scope.tweets = $scope.tweets || [];

    if (typeof tweets =='string')
      tweets = JSON.parse(tweets);

    $scope.tweets = $scope.tweets.concat(tweets);
  });

});
