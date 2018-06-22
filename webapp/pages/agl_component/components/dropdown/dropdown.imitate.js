/**
 * Created by wuhaiying on 2018/6/13.
 */
(function(){
    'use strict';

    var aglDropdownImitateConfig = {
        appendToOpenClass: 'agl-dropdown-open',
        openClass: 'open'
    };

    angular.module('agl.dropdown.imitate',['agl.multiMap'])

        .constant('aglDropdownImitateConfig',aglDropdownImitateConfig)
        .service('aglDropdownImitateService',aglDropdownImitateService)
        .controller('aglDropdownImitateController',aglDropdownImitateController)
        .directive('aglDropdownImitate',aglDropdownImitate)
        .directive('aglDropdownToggleImitate',aglDropdownToggleImitate)
        .directive('aglDropdownMenuImitate',aglDropdownMenuImitate);

    aglDropdownImitateService.$inject = ['$document','$rootScope','$$multiMap'];
    function aglDropdownImitateService($document,$rootScope,$$multiMap){
        var openScope = null;
        var openedContainers = $$multiMap.createNew();

        this.isOnlyOpen = function(dropdownScope, appendTo){
            var openedDropdowns = openedContainers.get(appendTo);
            if(openedDropdowns){
                var openDropdown = openedDropdowns.reduce(function(toClose,dropdown){
                    if(dropdown.scope === dropdownScope){
                        return dropdown;
                    }
                    return toClose;
                },{});
                if(openDropdown){
                    return openedDropdowns.length === 1;
                }
            }
            return false;
        };

        this.open = function(dropdownScope, element, appendTo){
            if(!openScope){
                $document.on('click',closeDropdown);
            }
            if(openScope && openScope !== dropdownScope){
                openScope.isOpen = false;
            }
            openScope = dropdownScope;

            if(!appendTo){
                return;
            }

            var openedDropdowns = openedContainers.get(appendTo);
            if(openedDropdowns){
                var openedScopes = openedDropdowns.map(function(dropdown){
                    return dropdown.scope;
                });
                if(openedScopes.indexOf(dropdownScope) === -1){
                    openedContainers.put(appendTo,{
                        scope:dropdownScope
                    })
                }
            }else{
                openedContainers.put(appendTo,{
                    scope: dropdownScope
                })
            }

        };

        this.close = function(dropdownScope, element, appendTo){
            if(openScope === dropdownScope){
                $document.off('click',closeDropdown);
                openScope = null;
            }
            if(!appendTo){
                return;
            }
            var openedDropdowns = openedContainers.get(appendTo);
            if(openedDropdowns){
                var dropdownToClose = openedDropdowns.reduce(function (toClose, dropdown) {
                    if(dropdown.scope === dropdownScope){
                        return dropdown;
                    }
                    return toClose;
                },{});
                if(dropdownToClose){
                    openedContainers.remove(appendTo,dropdownToClose);
                }
            }

        };

        var closeDropdown = function(evt){

            if(!openScope || !openScope.isOpen){
                return;
            }

            if(evt && openScope.getAutoClose() === 'disabled'){
                return;
            }

            var toggleElement = openScope.getToggleElement();
            if(evt && toggleElement && toggleElement[0].contains(evt.target)){
                return;
            }

            var dropdownElement = openScope.getDropdownElement();
            if(evt && openScope.getAutoClose() === 'outsideClick' && dropdownElement && dropdownElement[0].contains(evt.target)){
                return;
            }
            openScope.focusToggleElement();
            openScope.isOpen = false;

            if(!$rootScope.$$phase){
                openScope.$apply();
            }

        };
    }

    aglDropdownImitateController.$inject = ['$scope', '$element', '$attrs','$document','$compile','$parse','$animate','aglDropdownImitateService','aglDropdownImitateConfig','AglPosition','$templateRequest'];
    function aglDropdownImitateController($scope, $element, $attrs, $document, $compile, $parse, $animate, aglDropdownImitateService, aglDropdownImitateConfig, aglPosition, $templateRequest){
        var self = this,
            scope = $scope.$new(),
            appendToOpenClass = aglDropdownImitateConfig.appendToOpenClass,
            openClass = aglDropdownImitateConfig.openClass,
            templateScope,
            getIsOpen,
            setIsOpen = angular.noop,
            toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop,
            body = $document.find('body');

        $element.addClass('dropdown');

        scope.getToggleElement = function(){
            return self.toggleElement;
        };

        scope.getElement = function(){
            return $element;
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
        scope.getAutoClose = function(){
            return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
        };



        this.init = function(){
            if($attrs.isOpen){
                getIsOpen = $parse($attrs.isOpen);
                setIsOpen = getIsOpen.assign;
                $scope.$watch(getIsOpen, function(value){
                    scope.isOpen = !!value;
                })
            }
        };

        this.toggle = function(open){
            scope.isOpen = arguments.length ? !!open : !scope.isOpen;
            if(angular.isFunction(setIsOpen)){
                setIsOpen(scope,scope.isOpen);
            }
            return scope.isOpen;
        };

        this.isOpen = function(){
            return scope.isOpen;
        };

        scope.$watch('isOpen',function(isOpen,wasOpen){
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
                    $element.on('$destroy',removeDropdownMenu);
                }else{
                    $element.off('$destroy',removeDropdownMenu);
                    removeDropdownMenu();
                }
            }

            if(appendTo && self.dropdownMenu){
                var pos = aglPosition.positionElements($element, self.dropdownMenu, 'bottom-left', true),
                    css,
                    rightalign,
                    scrollbarPadding,
                    scrollbarWidth = 0;

                css = {
                    top: pos.top + 'px',
                    display: isOpen ? 'block' : 'none'
                };

                rightalign = self.dropdownMenu.hasClass('dropdown-menu-right');
                if (!rightalign) {
                    css.left = pos.left + 'px';
                    css.right = 'auto';
                } else {
                    css.left = 'auto';
                    scrollbarPadding = aglPosition.scrollbarPadding(appendTo);

                    if (scrollbarPadding.heightOverflow && scrollbarPadding.scrollbarWidth) {
                        scrollbarWidth = scrollbarPadding.scrollbarWidth;
                    }

                    css.right = window.innerWidth - scrollbarWidth -
                    (pos.left + $element.prop('offsetWidth')) + 'px';
                }

                // Need to adjust our positioning to be relative to the appendTo container
                // if it's not the body element
                if (!appendToBody) {
                    var appendOffset = aglPosition.offset(appendTo);

                    css.top = pos.top - appendOffset.top + 'px';

                    if (!rightalign) {
                        css.left = pos.left - appendOffset.left + 'px';
                    } else {
                        css.right = window.innerWidth -
                        (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
                    }
                }

                self.dropdownMenu.css(css);
            }



            var openContainer = appendTo ? appendTo : $element;
            var dropdownOpenClass = appendTo ? appendToOpenClass : openClass;
            var hasOpenClass = openContainer.hasClass(dropdownOpenClass);
            var isOnlyOpen = aglDropdownImitateService.isOnlyOpen($scope , appendTo);

            if(hasOpenClass === !isOpen){
                var toggleClass;
                if(appendTo){
                    toggleClass = !isOnlyOpen ? 'addClass' : 'removeClass';
                }else{
                    toggleClass = isOpen ? 'addClass' : 'removeClass';
                }
                $animate[toggleClass](openContainer, dropdownOpenClass).then(function(){
                    if(angular.isDefined(isOpen) && isOpen !== wasOpen){
                        toggleInvoker($scope,{open: !!isOpen});
                    }
                });
            }


            if(isOpen){
                if (self.dropdownMenuTemplateUrl) {
                    $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
                        templateScope = scope.$new();
                        $compile(tplContent.trim())(templateScope, function(dropdownElement) {
                            var newEl = dropdownElement;
                            self.dropdownMenu.replaceWith(newEl);
                            self.dropdownMenu = newEl;
                        });
                    });
                }
                scope.focusToggleElement();
                aglDropdownImitateService.open(scope, $element, appendTo);
            }else{
                aglDropdownImitateService.close(scope, $element, appendTo);
                if (self.dropdownMenuTemplateUrl) {
                    if (templateScope) {
                        templateScope.$destroy();
                    }
                    var newEl = angular.element('<ul class="dropdown-menu"></ul>');
                    self.dropdownMenu.replaceWith(newEl);
                    self.dropdownMenu = newEl;
                }
            }

            if(angular.isFunction(setIsOpen)){
                setIsOpen($scope, isOpen);
            }
        })
    }

    aglDropdownImitate.$inject = [];
    function aglDropdownImitate(){
        return{
            controller: 'aglDropdownImitateController',
            link: function(scope, element, attrs, dropdownCtrl){
                dropdownCtrl.init();
            }
        }
    }

    aglDropdownToggleImitate.$inject = [];
    function aglDropdownToggleImitate(){
        return{
            require: '?^aglDropdownImitate',
            link: function(scope, element, attrs, dropdownCtrl){
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

                element.attr('aria-expanded', false);
                scope.$watch(dropdownCtrl.isOpen, function(isOpen){
                    element.attr('aria-expanded',!!isOpen);
                });
                scope.$on('$destroy', function(){
                    element.off('click',toggleDropdown);
                })

            }
        }
    }

    aglDropdownMenuImitate.$inject = [];
    function aglDropdownMenuImitate(){
        return{
            restrict:'A',
            require: '?^aglDropdownImitate',
            link: function(scope, element, attrs, dropdownCtrl){
                element.addClass('dropdown-menu');

                var tplUrl = attrs.templateUrl;
                if(tplUrl){
                    dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
                }

                dropdownCtrl.dropdownMenu = element;
            }
        }
    }


})();