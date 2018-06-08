/**
 * Created by RosalynWu on 2018/5/30.
 */
(function(){
    'use strict';

    angular
        .module('aglComponents')
        .directive('testDirective',testDirective)
        .controller('TestController',testController);
    testController.$inject = ['$scope','$parse','$templateRequest'];
    function testController($scope, $parse, $templateRequest){
        $scope.add = function(x,y){
            return x+y;
        }

    }
    testDirective.$inject = [];
    function testDirective(){
        return{
            restrict: "E",
            template:"{{result}} <input ng-model=result>",
            scope:{
                localFun: "&fn"
            },
            link: function(scope,elem, attr){
                console.log(attr);
                attr.$set('ngModal','new value');
                attr.$observe('ngModal',function(value){
                    console.log('这是变化的' + value)
                });
                scope.result = scope.localFun({
                    x:5,
                    y:7
                })
            }
        }
    }


})();
