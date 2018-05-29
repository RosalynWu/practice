/**
 * Created by RosalynWu on 2018/5/28.
 */
(function(){
    'use strict';

    angular
        .module("aglComponents",['ui.router'])
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state({
            name: 'main',
            url: '/main',
            templateUrl: 'app/layouts/main/main.html'
        }).state({
            name: 'subMain',
            url: '/subMain',
            templateUrl: 'app/layouts/sub_main/sub_main.html'
        });
    }

})();
