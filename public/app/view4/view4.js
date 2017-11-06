'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view4', {
        templateUrl: 'view4/view4.html',
        controller: 'view4Ctrl'
      });
    }])
    .controller('view4Ctrl', [ '$routeParams', '$scope', '$http', '$route', '$location', '$rootScope', function( $routeParams, $scope, $http, $route, $location, $rootScope ) {
        $rootScope.hideimage = true
    } ]);

