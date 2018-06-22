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
                    name: 'blank.internal',
                    url: '/internal',
                    templateUrl: 'pages/internal/internal.html'
                })
        }


})();