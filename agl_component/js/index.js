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
        console.log($stateProvider);
    }

})();
