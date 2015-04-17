(function() {
    'use strict';

    angular
        .module('<%= camelizedSingularName %>')
        .controller('<%= classifiedSingularName %>Controller', <%= classifiedSingularName %>Controller);

    <%= classifiedSingularName %>Controller.$inject = ['<%= classifiedSingularName %>Service'];
    /**
     * Controller for <%= humanizedSingularName %>
     */
    function <%= classifiedSingularName %>Controller(<%= classifiedSingularName %>Service) {
        var vm = this;
        vm.helloWorld = helloWorld;
        vm.helloWorldService = <%= classifiedSingularName %>Service.get();
        ///////////////////////////////
        function helloWorld() {
            return 'Hello World';
        }
    }
})();
