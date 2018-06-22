/**
 * Created by RosalynWu on 2018/5/30.
 */
(function(){
    'use strict';

    angular
        .module('practiceApp')
        .controller('TestController',testController);
    testController.$inject = ['$scope','$http','$window'];
    function testController($scope, $http, $window){
        $scope.items = ['选项1', '选项2', '选项3', '选项4'];

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

        //数据遍历完成才执行的方法
        $scope.repeatFinish = function(){
            console.log('渲染完成就执行这一步');
        };

        //跳转到日志查询页 （新开）
        var url = '/blank';
        $scope.logsQueryPage = function(){
            $window.open(url);
        };

        /*数据交互练习*/
        /*初始化查询条件*/
        $scope.queryParams = {
            page: 0, //页码
            size: '20', //条数
            customerProperty: '', //客户(编号/名称)
            productCode: '', //产品编号
            productVersionCode: '', //版本号编号
            logContent: '', //日志内容
            logSubmitTimeStart: '', //日志提交时间 起始 （yyyy-MM-dd HH:mm:ss）
            logSubmitTimeEnd: '' //日志提交时间 结束 （yyyy-MM-dd HH:mm:ss）
        };



        /*获取数据*/
        $scope.getAll = function(){
            $http
                .get('http://10.6.23.13:1088/applogs/api/logs',{params:$scope.queryParams})
                .then(function(logsRes){
                    $scope.logs = logsRes.data;

                }, function(logsErr){
                    console.error(logsErr);
                });
        };


    }

    blankDefaultController.$inject = [];
    function blankDefaultController(){
        console.log(123);
    }

})();
