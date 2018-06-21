/**
 * Created by wuhaiying on 2018/6/19.
 */
(function(){
    'use strict';

    angular.module('agl.alert',[])

        .controller('aglAlertController',aglAlertController)
        .directive('aglAlert',aglAlert);

    aglAlertController.$inject = ['$scope', '$element', '$attrs', '$interpolate','$timeout'];
    function aglAlertController($scope, $elements, $attrs, $interpolate, $timeout){
        $elements.addClass('alert');
        $attrs.$set('role','alert');

        $scope.getType = function(){
            var type = $attrs.type;
            if(type == 'warning'){
                $elements.addClass('alert-warning');
            }else if(type == 'error'){
                $elements.addClass('alert-danger');
            }else if(type == 'success'){
                $elements.addClass('alert-success');
            }else{
                $elements.addClass('alert-info');
            }
        };
        $scope.getType();


        $scope.closeable = !!$attrs.close;
        if($scope.closeable){
            $elements.addClass('alert-dismissible');
            var clickElement = $elements.find('.close');
            clickElement.on('click',function(){
                $elements.remove();
            });

        }

        var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
            $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;
        if(dismissOnTimeout){
            $timeout(function(){
                $elements.remove();
            },parseInt(dismissOnTimeout,10));
        }

    }

    aglAlert.$inject = [];
    function aglAlert(){
        return{
            restrict: 'A',
            controller: 'aglAlertController',
            templateUrl: function(element, attrs){
                return attrs.templateUrl || 'agl/templates/alert.html';
            },
            transclude: true,
            scope: {
                close: '&',
                type: '@type'
            }
        }
    }
})();