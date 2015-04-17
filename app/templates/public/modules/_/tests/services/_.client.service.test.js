(function() {
    'use strict';
    // Theme layoutProvider tests
    describe('Service: <%= humanizedSingularName %>', function() {
        var $httpBackend;
        var <%= camelizedSingularName %>Service;
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/<%= appname %>/hello-world')
                .respond({data: 'test'});
        }));
        beforeEach(inject(function(_<%= camelizedSingularName %>Service_) {
            <%= camelizedSingularName %>Service = _<%= camelizedSingularName %>Service_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('Should be defined', function() {
            expect(<%= camelizedSingularName %>Service).not.toBeUndefined();
        });
        it('Should return the expected data', function() {
            <%= camelizedSingularName %>Service.get().$promise.then(function(value) {
                expect(JSON.stringify(value)).toEqual(JSON.stringify({data: 'test'}));
            });
            $httpBackend.flush();
        });
    });
}());