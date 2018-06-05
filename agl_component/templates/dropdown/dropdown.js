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

        this.toggle = function(open){
            scope.isOpen = arguments.length ? !!open : !scope.isOpen;
            if(angular.isFunction(setIsOpen)){
                setIsOpen(scope, scope.isOpen);
            }
            return scope.isOpen;
        };

        this.isOpen = function(){
            return scope.isOpen;
        };

        scope.getToggleElement = function(){
            return self.toggleElement;
        };

        scope.getAutoClose = function(){
            return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
        };

        scope.getElement = function(){
            return $element;
        };

        scope.isKeyNavEnabled = function(){
            return keynavEnabled;
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
                if(!dropdownCtrl){
                    return;
                }

                element.addClass('dropdown-toggle');

                dropdownCtrl.toggleElement = element;

                var toggleDropdown = function(event){
                    event.preventDefault();
                    if(!element.hasClass('disabled') && !attrs.disabled){
                        scope.$apply(function(){
                            dropdownCtrl.toggle();
                        })
                    }
                };

                element.on('click',toggleDropdown);

                element.attr({'aria-expanded': false});
                scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
                    element.attr('aria-expanded', !!isOpen);
                });

                scope.$on('$destroy', function() {
                    element.off('click', toggleDropdown);
                })
            }
        }
    }

    aglDropdownMenu.$inject = [];
    function aglDropdownMenu(){
        return{
            restrict: 'A',
            require: '?^aglDropdown',
            link: function(scope, element, attrs, dropdownCtrl){
                if(!dropdownCtrl){
                    return;
                }

                element.addClass('dropdown-menu');

                var tplUrl = attrs.templateUrl;
                if(tplUrl){
                    dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
                }
                if(!dropdownCtrl.dropdownMenu){
                    dropdownCtrl.dropdownMenu = element;
                }

            }
        }
    }

})();
