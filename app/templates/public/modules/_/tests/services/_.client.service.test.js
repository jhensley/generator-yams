(function() {
    'use strict';
    // Theme layoutProvider tests
    describe('Service: <%= humanizedPluralName %>', function() {
        var $httpBackend;
        var ApplicationOfWondersService;
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/<%= appname %>/hello-world')
                .respond({data: 'test'});
        }));
        beforeEach(inject(function(_<%= classifiedPluralName %>Service_) {
        <%= classifiedPluralName %>Service = _<%= classifiedPluralName %>Service_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('layoutModulesService', function() {
            it('Should be defined', function() {
                expect(<%= classifiedPluralName %>Service).not.toBeUndefined();
            });
            it('Should return the expected data', function() {
                <%= classifiedPluralName %>Service.get().$promise.then(function(value) {
                    expect(JSON.stringify(value)).toEqual(JSON.stringify({data: 'test'}));
                });
                $httpBackend.flush();
            });
        });
    });
}());