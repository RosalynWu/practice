/**
 * Created by RosalynWu on 2018/5/30.
 */
(function(){
    'use strict';

    angular.module('agl.components.tpl',['agl/templates/alert.html']);

    angular.module('agl/templates/alert.html',[]).run(["$templateCache" , function($templateCache){
        $templateCache.put("agl/templates/alert.html",
            "<button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
            "  <span aria-hidden=\"true\">&times;</span>\n" +
            "  <span class=\"sr-only\">Close</span>\n" +
            "</button>\n" +
            "<div ng-transclude></div>\n"+
            "");
    }])

})();