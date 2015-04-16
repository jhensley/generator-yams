(function() {
    'use strict';
    describe('Controller: <%= humanizedPluralName %>', function() {
        //Initialize global variables
        var $httpBackend,
            <%= classifiedPluralName %>Controller;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        // Mock the AJAX calls
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/<%= appname %>/hello-world')
                .respond({data: 'test'});
        }));
        beforeEach(inject(function($controller) {
            <%= classifiedPluralName %>Controller = $controller('<%= classifiedPluralName %>Controller');
        }));
        it('Should expose the helloWorld variable', function() {
            expect(<%= classifiedPluralName %>Controller.helloWorld()).toEqual('Hello World');
        });
        it('Should expose the helloWorld service', function() {
            $httpBackend.flush();
            // When using $resource you have to stringify it to get rid of the Angular garbage
            expect(JSON.stringify(<%= classifiedPluralName %>Controller.helloWorldService)).toEqual('{"data":"test"}');
        });
    });
})();