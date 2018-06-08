/**
 * Created by wuhaiying on 2018/6/8.
 */
(function(){
    'use strict';

    angular.module('agl.share',[])

        .directive('aglShare',aglShare);

        aglShare.$inject = [];

        function aglShare(){
            return{
                restrict: 'A',
                replace: true,
                templateUrl: 'templates/share/share.html',
                link: function($scope, $element, $attrs){
                    //默认初始设置
                    var defaultOptions = {
                        title:'RosalynWu的小组件库',
                        url: 'https://www.ynk12.com/login.html',
                        //微博图片参数
                        pic:'https://k12-public-read.oss-cn-shanghai.aliyuncs.com/k12/weixin/default_bc.png',
                        //QQ好友、QQ空间图片参数（参数pics设置分享图片的路径，多张图片以＂|＂隔开）
                        pics:'https://k12-public-read.oss-cn-shanghai.aliyuncs.com/k12/weixin/default_bc.png'
                    };
                    $scope.shareOptions = angular.extend(defaultOptions,$scope.shareOptions);
                    $scope.shareData = function(type){
                        $scope.shareUrl = '';
                        if(type == 'qq'){
                            $scope.shareUrl = 'http://connect.qq.com/widget/shareqq/index.html?';
                        }else if(type == 'zone'){
                            $scope.shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
                        }else if(type == 'microblog'){
                            $scope.shareUrl = 'http://service.weibo.com/share/share.php?';
                        }
                        if($scope.shareOptions.title){
                            $scope.shareUrl += ('title='+encodeURIComponent($scope.shareOptions.title));
                        }
                        if($scope.shareOptions.url){
                            $scope.shareUrl += ('&url='+encodeURIComponent($scope.shareOptions.url));
                        }
                        if($scope.shareOptions.pic && type == 'microblog'){
                            $scope.shareUrl += ('&pic='+encodeURIComponent($scope.shareOptions.pic));
                        }
                        if($scope.shareOptions.pics && type != 'microblog'){
                            $scope.shareUrl += ('&pics='+encodeURIComponent($scope.shareOptions.pics));
                        }
                        window.open($scope.shareUrl)
                    }
                }
            }
        }

})();