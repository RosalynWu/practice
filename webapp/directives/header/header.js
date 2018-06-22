/**
 * Created by wuhaiying on 2018/6/22.
 */
(function(){
    'use strict';

    angular.module('practiceApp')

        .directive('header',header);

    header.$inject = [];
    function header(){
        return{
            replace: true,
            templateUrl: 'directives/header/header.html',
            controller: 'headerCtrl',
            link: function(scope, element, attr){
                //代码从这儿开始
            }
        }
    }

})();