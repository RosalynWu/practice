/**
 * Created by yineng on 2018/6/22.
 */
(function(){
    'use strict';

    angular.module('practiceApp')

        .directive('repeatFinished',repeatFinished)
        .directive('holdOnClick',holdOnClick)
        .directive('convertToNumber',convertToNumber);

    repeatFinished.$inject = [];
    function repeatFinished(){
        //$index $first $middle $last $odd $even
        return{
            link: function(scope, element, attr){
                if(scope.$last == true){
                    scope.$eval(attr.repeatFinished);
                }
            }
        }
    }

    holdOnClick.$inject = [];
    function holdOnClick(){
        return{
            restrict: 'C',
            link: function(scope, element, attr){
                if(element.hasClass('dropdown-menu')){
                    element.on('click',function(event){
                        event.stopPropagation();
                    })
                }
            }
        }
    }

    convertToNumber.$inject = [];
    function convertToNumber(){
        return{
            require: 'ngModel',
            link: function(scope, element, attr, ngModel){
                ngModel.$parsers.push(function(val){
                    return parseInt(val,10);
                });
                ngModel.$formatters.push(function(val){
                    return val;
                })
            }
        }
    }


})();
