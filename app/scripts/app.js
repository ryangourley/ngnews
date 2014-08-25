'use strict';
/* global app:true */
/**
 * @ngdoc overview
 * @name angappApp
 * @description
 * # angappApp
 *
 * Main module of the application.
 */
 
var app = angular
  .module('angappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ]);


/*just a constant so we can use our url later*/
app.constant('FIREBASE_URL', 'https://crackling-fire-3852.firebaseio.com/');

/*controls the flow of control in our web app*/
app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/users/:username',{
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .when('/posts/:postId',{
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
