/**
 * Created by wuhaiying on 2018/6/13.
 */
(function(){
    'use strict';

    angular.module('agl.dropdown.imitate',[])

        .directive('aglDropdownImitate',aglDropdownImitate)
        .directive('aglDropdownToggleImitate',aglDropdownToggleImitate)
        .directive('aglDropdownMenuImitate',aglDropdownMenuImitate);

    aglDropdownImitate.$inject = [];
    function aglDropdownImitate(){
        return{

        }
    }

    aglDropdownToggleImitate.$inject = [];
    function aglDropdownToggleImitate(){
        return{
            require: '?^aglDropdownImitate'
        }
    }

    aglDropdownMenuImitate.$inject = [];
    function aglDropdownMenuImitate(){
        return{
            require: '?^aglDropdownImitate'
        }
    }


})();