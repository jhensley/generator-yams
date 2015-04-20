(function() {
    'use strict';
    describe('Controller: <%= humanizedName %>', function() {
        //Initialize global variables
        var $httpBackend,
            <%= classifiedName %>Controller;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));
        // Mock the AJAX calls
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/<%= appname %>/hello-world')
                .respond({data: 'test'});
        }));
        beforeEach(inject(function($controller) {
            <%= classifiedName %>Controller = $controller('<%= classifiedName %>Controller');
        }));
        it('Should expose the helloWorld variable', function() {
            expect(<%= classifiedName %>Controller.helloWorld()).toEqual('Hello World');
        });
        it('Should expose the helloWorld service', function() {
            $httpBackend.flush();
            // When using $resource you have to stringify it to get rid of the Angular garbage
            expect(JSON.stringify(<%= classifiedName %>Controller.helloWorldService)).toEqual('{"data":"test"}');
        });
    });
})();
