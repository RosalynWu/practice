/**
 * Created by RosalynWu on 2018/5/28.
 */
(function(){
    'use strict';

    angular
        .module("aglComponents")
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
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
    }

})();
