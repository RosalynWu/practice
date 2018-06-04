/**
 * Created by RosalynWu on 2018/5/30.
 */
(function(){
    'use strict';

    var aglDropdownConfig ={
        appendToOpenClass: "agl-dropdown-open",
        openClass: 'open'
    };

    angular.module('agl.dropdown',['agl.position', 'agl.multiMap'])

    .constant("AglDropdownConfig",aglDropdownConfig)
    .service('AglDropdownService',aglDropdownService)
    .controller('AglDropdownController',aglDropdownController)
    .directive('aglDropdown',aglDropdown)
    .directive('aglDropdownToggle',aglDropdownToggle)
    .directive('aglDropdownMenu',aglDropdownMenu);

    aglDropdownService.$inject = ['$document','$rootScope','$$multiMap'];
    function aglDropdownService($document, $rootScope, $$multiMap){


    }

    aglDropdownController.$inject = ['$scope', '$element', '$attrs', '$parse', 'AglDropdownConfig','$document'];
    function aglDropdownController($scope, $element, $attrs, $parse, dropdownConfig, $document){
        var self = this,
            scope = $scope.$new(),
            templateScope,
            appendToOpenClass = dropdownConfig.appendToOpenClass,
            openClass = dropdownConfig.openClass,
            getIsOpen,
            setIsOpen = angular.noop,
            keynavEnabled = false,
            body = $document.find('body');

        $element.addClass('dropdown');

        this.init = function(){
            if($attrs.isOpen){
                getIsOpen = $parse($attrs.isOpen);
                setIsOpen = getIsOpen.assign;

                $scope.$watch(getIsOpen, function(value){
                    scope.isOpen = !!value;
                })
            }
            //keynavEnabled = angular.isDefined($attrs.keyboardNav);
        };

        this.isOpen = function(){
            return scope.isOpen;
        }
    }

    aglDropdown.$inject = [];
    function aglDropdown(){
        return{
            controller: 'AglDropdownController',
            link: function(scope, element, attrs,dropdownCtrl){
                dropdownCtrl.init();
            }
        }
    }

    aglDropdownToggle.$inject = [];
    function aglDropdownToggle(){
        return{
            require: '?^aglDropdown',
            link: function(scope, element, attrs, dropdownCtrl){
                element.addClass('dropdown-toggle');
            }
        }
    }

    aglDropdownMenu.$inject = [];
    function aglDropdownMenu(){
        return{
            restrict: 'A',
            require: '?^aglDropdown',
            link: function(scope, element, attrs, dropdownCtrl){
                element.addClass('dropdown-menu');
            }
        }
    }

})();