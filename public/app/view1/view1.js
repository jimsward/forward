'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
    .controller('View1Ctrl', [ '$routeParams', '$scope', '$http', '$route', '$location', '$rootScope', function( $routeParams, $scope, $http, $route, $location, $rootScope ) {
        $rootScope.hideimage = false
    }]);

