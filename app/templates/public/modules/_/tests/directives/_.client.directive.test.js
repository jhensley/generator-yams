(function() {
    'use strict';
    describe('Directive: <%= humanizedSingularName %>', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        describe('<%= camelizedSingularName %>', function() {
            var $compile, scope, $rootScope, element;
            beforeEach(inject(function(_$compile_, _$rootScope_) {
                // The injector unwraps the underscores (_) from around the parameter names when matching
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                scope = _$rootScope_.$new();
                // Setup the element
                element = '<<%= slugifiedSingularName %>></<%= slugifiedSingularName %>>';
                element = $compile(element)(scope);
                scope.$digest();
            }));
            it('Should parse "<<%= slugifiedSingularName %>>" into desired html', function() {
                expect(element[0].innerHTML).toBe('this is the <%= camelizedSingularName %> directive');
            });
        });
    });
})();