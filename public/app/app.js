'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
    'myApp.view4',
    'myApp.version',
  'ngAnimate',
    'auth0',
    'angular-storage',
    'angular-jwt',
    'ngMaterial',
    'material.svgAssetsCache',
    'myApp.home'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'})
      .when('/view3', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
      })
      .when('/view4', {
          templateUrl: 'view4/view4.html',
          controller: 'View4Ctrl'
      })
      .when('/home', {
          templateUrl: 'home/home.html',
          controller: 'homeCtrl'
      })
}])
    .config(function($mdThemingProvider, $mdIconProvider){

        /* $mdIconProvider
         .defaultIconSet("./assets/svg/avatars.svg", 128)
         .icon("menu"       , "./assets/svg/menu.svg"        , 24)
         .icon("share"      , "./assets/svg/share.svg"       , 24)
         .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
         .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
         .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
         .icon("phone"      , "./assets/svg/phone.svg"       , 512);*/

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink')
            .warnPalette('deep-orange')
            .backgroundPalette('grey');

    })
.config(function($provide, authProvider, $httpProvider, jwtInterceptorProvider) {

        authProvider.init({
            domain: 'jimbob1953.auth0.com',
            clientID: '5jJMImXaD8MFzAQ4S27H11LSZS3bFN1q'
        });

        /* $urlRouterProvider.otherwise("/home");

         $stateProvider
         .state('home', {
         url: '/home',
         templateUrl: 'components/home/home.tpl.html'
         })
         .state('profile', {
         url: '/profile',
         templateUrl: 'components/profile/profile.tpl.html',
         controller: 'profileController as user'
         });*/

        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('token');
        }

        //function redirect($q, $injector, auth, store, $location) {


        function redirect($q, $injector, $timeout, store, $location) {
            var auth;
            $timeout(function() {
                auth = $injector.get('auth');
            });



            return {
                responseError: function(rejection) {

                    if (rejection.status === 401) {
                        auth.signout();
                        store.remove('profile');
                        store.remove('token');
                        $location.path('/home')
                    }
                    return $q.reject(rejection);
                }
            }
        }
        $provide.factory('redirect', redirect);

        $httpProvider.interceptors.push('jwtInterceptor');
        $httpProvider.interceptors.push('redirect');
    })
    /*.run(function($rootScope, auth, store, jwtHelper, $location) {

        $rootScope.$on('$locationChangeStart', function() {
            // Get the JWT that is saved in local storage
            // and if it is there, check whether it is expired.
            // If it isn't, set the user's auth state
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            }
            else {
                // Otherwise, redirect to the home route
                $location.path('/home');
            }
        });

    })*/

