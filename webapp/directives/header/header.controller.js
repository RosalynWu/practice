/**
 * Created by wuhaiying on 2018/6/22.
 */
(function(){
    'use strict';

    angular.module('practiceApp')

        .controller('headerCtrl',headerCtrl);

    headerCtrl.$inject = ['$scope','$window'];
    function headerCtrl($scope, $window){
        $scope.openInternalPage = function(){
            $window.open("index.html#!/blank/internal");
        }
    }

})();