'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
      });
    }])
    .controller('View2Ctrl', [ '$routeParams', '$scope', '$http', '$route', '$location', '$rootScope', function( $routeParams, $scope, $http, $route, $location, $rootScope ) {
        $rootScope.hideimage = true
        $scope.contact = {}
        $scope.contactform = function () {

            var text = 'name : ' + $scope.contact.name + '\n' + 'email : ' + $scope.contact.email + '\n' + 'message : ' + $scope.contact.message
            var data = {'text': text, email: 'jim@jimsward.com'}

            console.dir(data)

            $http.post('/contact', data).then(function (data) {//add document to the messages collection
                })
                .then($http.post('/sendemail', data).then(function () {//send email with contact form data
                    console.log('sent email message')
                }))
                .then(function () {
                    //alert('Form submitted.')
                    $location.path('/view1')
                })
        }
    } ]);

