/**
 * Created by RosalynWu on 2018/5/30.
 */
(function(){
    'use strict';

    angular
        .module('aglComponents')
        .directive('testDirective',testDirective)
        .controller('TestController',testController);
    testController.$inject = ['$scope','$parse','$$multiMap'];
    function testController($scope, $parse, $$multiMap){

        $scope.add = function(x,y){
            return x+y;
        }

    }
    testDirective.$inject = [];
    function testDirective(){
        return{
            restrict: "E",
            template:"{{result}}",
            scope:{
                localFun: "&fn"
            },
            link: function(scope){
                scope.result = scope.localFun({
                    x:5,
                    y:7
                })
            }
        }
    }


})();
