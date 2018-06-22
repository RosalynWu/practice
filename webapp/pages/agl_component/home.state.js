/**
 * Created by wuhaiying on 2018/6/22.
 */
(function(){

    'use strict';

    angular
        .module('practiceApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider','$urlRouterProvider'];
    function stateConfig($stateProvider,$urlRouterProvider){



        $stateProvider
            .state({
                name: 'main.directives',
                url: '/directives',
                templateUrl: 'pages/agl_component/home.html',
                controller: 'TestController'
            })
            .state({
                name: 'main.directives.dropdown',
                url: '/dropdown',
                templateUrl: 'pages/agl_component/subpages/dropdown.html'
                //views:{
                //    "@main":{
                //        templateUrl: 'pages/agl_component/subpages/dropdown.html'
                //    }
                //}
            })
            .state({
                name: 'main.directives.share',
                url: '/share',
                templateUrl: 'pages/agl_component/subpages/share.html'
            })
            .state({
                name: 'main.directives.alert',
                url: '/alert',
                templateUrl: 'pages/agl_component/subpages/alert.html'
            })
    }


})();