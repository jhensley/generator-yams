(function() {
    'use strict';
    // Theme layoutProvider tests
    describe('Service: <%= humanizedSingularName %>', function() {
        var $httpBackend;
        var <%= classifiedSingularName %>Service;
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/<%= appname %>/hello-world')
                .respond({data: 'test'});
        }));
        beforeEach(inject(function(_<%= classifiedSingularName %>Service_) {
            <%= classifiedSingularName %>Service = _<%= classifiedSingularName %>Service_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('Should be defined', function() {
            expect(<%= classifiedSingularName %>Service).not.toBeUndefined();
        });
        it('Should return the expected data', function() {
            <%= classifiedSingularName %>Service.get().$promise.then(function(value) {
                expect(JSON.stringify(value)).toEqual(JSON.stringify({data: 'test'}));
            });
            $httpBackend.flush();
        });
    });
}());