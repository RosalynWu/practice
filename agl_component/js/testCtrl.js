/**
 * Created by RosalynWu on 2018/5/30.
 */
(function(){
    'use strict';

    angular
        .module('aglComponents')
        .controller('TestController',testController);
    testController.$inject = ['$scope'];
    function testController($scope){
        $scope.items = ['选项1', '选项2', '选项3', '选项4'];


        //$http.get('http://10.6.23.13:8080/api/logs?page=0&size=5&customCode=&productCode=&productVersionCode=&logContent=&logSubmitTimeStart=&logSubmitTimeEnd=').then(function(response){
        //    console.log(response)
        //});

        $scope.testClick = function(){
            console.log('点击事件触发了');
        };
        $scope.status = {
            isOpen:false
        };
        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isOpen = !$scope.status.isOpen;
        };
    }

})();
