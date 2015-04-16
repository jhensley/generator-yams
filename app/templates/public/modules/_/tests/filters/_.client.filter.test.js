(function() {
    'use strict';
    describe('Filter: <%= humanizedPluralName %>', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(function() {
                module('<%= appname %>');
            }
        );
        var $filter;
        beforeEach(function() {
            inject(function(_$filter_) {
                $filter = _$filter_;
            });
        });
        it('should be truthy', function() {
            expect($filter('<%= camelizedSingularName %>')).toBeTruthy();
        });
        it('should append: "<%= camelizedSingularName %> filter: " to the passed in text', function() {
            var testInput = 'Testing';
            var joinFilter = $filter('<%= camelizedSingularName %>');
            expect(joinFilter(testInput)).toEqual('<%= camelizedSingularName %> filter: Testing');
        });
        it('should return "<%= camelizedSingularName %> filter: " if nothing is passed', function() {
            var joinFilter = $filter('<%= camelizedSingularName %>');
            expect(joinFilter('')).toEqual('<%= camelizedSingularName %> filter: ');
        });
    });
})();