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

        $urlRouterProvider.otherwise("/main");

        $stateProvider
            .state({
                name: 'main',
                url: '/main',
                templateUrl: 'layouts/main/main.html'
            })
            .state({
                name: 'blank',
                url: '/blank',
                templateUrl: 'layouts/blank/blank.html'
            });

    }

})();
