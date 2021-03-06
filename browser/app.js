'use strict';

var app = angular.module('Effektiv', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial', 'btford.socket-io']);


app.config(function($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});
