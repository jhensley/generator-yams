(function() {
    'use strict';
    describe('Directive: <%= humanizedName %>', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        describe('<%= camelizedName %>', function() {
            var $compile, scope, $rootScope, element;
            beforeEach(inject(function(_$compile_, _$rootScope_) {
                // The injector unwraps the underscores (_) from around the parameter names when matching
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                scope = _$rootScope_.$new();
                // Setup the element
                element = '<<%= slugifiedName %>></<%= slugifiedName %>>';
                element = $compile(element)(scope);
                scope.$digest();
            }));
            it('Should parse "<<%= slugifiedName %>>" into desired html', function() {
                expect(element[0].innerHTML).toBe('this is the <%= camelizedName %> directive');
            });
        });
    });
})();
