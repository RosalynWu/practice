/**
 * Created by wuhaiying on 2018/6/22.
 */
(function(){

    'use strict';

    angular
        .module('practiceApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider){


        $stateProvider
            .state({
                name: 'main.data',
                url: '/data',
                templateUrl: 'pages/data_mutual/home.html'
            })
    }


})();