/**
 * Created by RosalynWu on 2018/5/28.
 */
(function(){
    'use strict';

    angular
        .module("practiceApp")
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/dropdown");

        $stateProvider
            .state({
                name: 'dropdown',
                url: '/dropdown',
                templateUrl: 'tpl/dropdown.html',
                controller: 'TestController'
            })
            .state({
                name: 'share',
                url: '/share',
                templateUrl: 'tpl/share.html'
            })
            .state({
                name: 'alert',
                url: '/alert',
                templateUrl: 'tpl/alert.html',
                controller: 'TestController'
            })
            .state({
                name: 'datamutual',
                url: '/datamutual',
                templateUrl: 'tpl/data_mutual.html',
                controller: 'TestController'
            });

        $stateProvider
            .state({
                name: 'blank',
                url: '/blank',
                templateUrl:'blank/blank_default.html'
            })

    }

})();
