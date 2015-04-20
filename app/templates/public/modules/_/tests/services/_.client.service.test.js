(function() {
    'use strict';
    // Theme layoutProvider tests
    describe('Service: <%= humanizedName %>', function() {
        var $httpBackend;
        var <%= classifiedName %>Service;
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/<%= appname %>/hello-world')
                .respond({data: 'test'});
        }));
        beforeEach(inject(function(_<%= classifiedName %>Service_) {
            <%= classifiedName %>Service = _<%= classifiedName %>Service_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('Should be defined', function() {
            expect(<%= classifiedName %>Service).not.toBeUndefined();
        });
        it('Should return the expected data', function() {
            <%= classifiedName %>Service.get().$promise.then(function(value) {
                expect(JSON.stringify(value)).toEqual(JSON.stringify({data: 'test'}));
            });
            $httpBackend.flush();
        });
    });
}());
