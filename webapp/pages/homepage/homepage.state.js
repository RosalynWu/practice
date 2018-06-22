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
                    name: 'main.homepage',
                    url: '/homepage',
                    templateUrl: 'pages/homepage/homepage.html'
                })
        }


})();