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

    aglDropdownController.$inject = ['$scope', '$element', '$attrs', '$parse', 'AglDropdownConfig','$document','AglPosition'];
    function aglDropdownController($scope, $element, $attrs, $parse, dropdownConfig, $document, $position){
        var self = this,
            scope = $scope.$new(),
            templateScope,
            appendToOpenClass = dropdownConfig.appendToOpenClass,
            openClass = dropdownConfig.openClass,
            getIsOpen,
            setIsOpen = angular.noop,
            keynavEnabled = false,
            selectedOption = null,
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
        };

        scope.focusDropdownEntry = function(keyCode){
            var elems = self.dropdownMenu ? angular.element(self.dropdownMenu).find('a') : $element.find('ul').eq(0).find('a');

            switch (keyCode){
                case 40: {
                    if(!angular.isNumber(self.selectedOption)){
                        self.selectedOption = 0;
                    }else{
                        self.selectedOption = self.selectedOption === elems.length - 1 ?
                            self.selectedOption : self.selectedOption + 1;
                    }
                    break;
                }
                case 38:{
                    if(!angular.isNumber(self.selectedOption)){
                        self.selectedOption = elems.length - 1;
                    }else{
                        self.selectedOption = self.selectedOption === 0 ?
                            0 : self.selectedOption - 1;
                    }
                    break;
                }
            }

            elems[self.selectedOption].focus();
        };

        scope.getDropdownElement = function(){
            return self.dropdownMenu;
        };

        scope.focusToggleElement = function(){
            if(self.toggleElement){
                self.toggleElement[0].focus();
            }
        };

        function removeDropdownMenu(){
            $element.append(self.dropdownMenu);
        }

        scope.$watch('isOpen',function(isOpen, wasOpen){
            var appendTo = null,
                appendToBody = false;

            if(angular.isDefined($attrs.dropdownAppendTo)){
                var appendToEl = $parse($attrs.dropdownAppendTo)(scope);
                if(appendToEl){
                    appendTo = angular.element(appendToEl);
                }
            }

            if(angular.isDefined($attrs.dropdownAppendToBody)){
                var appendToBodyValue = $parse($attrs.dropdownAppendToBody)(scope);
                if(appendToBodyValue !== false){
                    appendToBody = true;
                }
            }

            if(appendToBody && !appendTo){
                appendTo = body;
            }

            if(appendTo && self.dropdownMenu){
                if(isOpen){
                    appendTo.append(self.dropdownMenu);
                    $element.on('$destroy', removeDropdownMenu);
                }else{
                    $element.off('$destroy', removeDropdownMenu);
                    removeDropdownMenu();
                }
            }

            if(appendTo && self.dropdownMenu){
                var pos = $position.positionElements($element,self.dropdownMenu, 'bottom-left',true),
                    css,
                    rightalign,
                    scrollbarPadding,
                    scrollbarWidth = 0;

                css = {
                    top: pos.top + 'px',
                    display: isOpen ? 'block' : 'none'
                };
                rightalign = self.dropdown.hasClass('dropdown-menu-right');
                if(!rightalign){
                    css.left = pos.left + 'px';
                    css.right = 'auto';
                }else{
                    css.left = 'auto';
                    scrollbarPadding = $position.scrollbarPadding(appendTo);
                    if(scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth){
                        scrollbarWidth = scrollbarPadding.scrollbarWidth;
                    }
                    css.right = window.innerWidth - scrollbarWidth - (pos.left + $element.prop('offsetWidth')) + 'px'
                }

                if(!appendToBody){
                    var appendOffset = $position.offset(appendTo);
                    css.top = pos.top - appendOffset.top + 'px';
                    if(!rightalign){
                        css.left = pos.left - appendOffset.left + 'px';
                    }else{
                        css.right = window.innerWidth - (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
                    }
                }

                self.dropdownMenu.css(css);
            }



        })


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
