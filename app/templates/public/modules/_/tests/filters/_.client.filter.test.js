(function() {
    'use strict';
    describe('Filter: <%= humanizedName %>', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(function() {
                module('<%= camelizedName %>');
            }
        );
        var $filter;
        beforeEach(function() {
            inject(function(_$filter_) {
                $filter = _$filter_;
            });
        });
        it('should be truthy', function() {
            expect($filter('<%= camelizedName %>')).toBeTruthy();
        });
        it('should append: "<%= camelizedName %> filter: " to the passed in text', function() {
            var testInput = 'Testing';
            var joinFilter = $filter('<%= camelizedName %>');
            expect(joinFilter(testInput)).toEqual('<%= camelizedName %> filter: Testing');
        });
        it('should return "<%= camelizedName %> filter: " if nothing is passed', function() {
            var joinFilter = $filter('<%= camelizedName %>');
            expect(joinFilter('')).toEqual('<%= camelizedName %> filter: ');
        });
    });
})();