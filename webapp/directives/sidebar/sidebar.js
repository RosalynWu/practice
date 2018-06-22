/**
 * Created by wuhaiying on 2018/6/22.
 */
(function(){
    'use strict';

    angular.module('practiceApp')

        .directive('sidebar',sidebar);

    sidebar.$inject = [];
    function sidebar(){
        return{
            templateUrl: 'directives/sidebar/sidebar.html',
            link: function(scope, element, attr){
                //代码从这儿开始
            }
        }
    }

})();
