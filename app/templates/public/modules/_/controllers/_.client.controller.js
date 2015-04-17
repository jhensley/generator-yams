(function() {
    'use strict';

    angular
        .module('<%= camelizedName %>')
        .controller('<%= classifiedName %>Controller', <%= classifiedName %>Controller);

    <%= classifiedName %>Controller.$inject = ['<%= classifiedName %>Service'];
    /**
     * Controller for <%= humanizedName %>
     */
    function <%= classifiedName %>Controller(<%= classifiedName %>Service) {
        var vm = this;
        vm.helloWorld = helloWorld;
        vm.helloWorldService = <%= classifiedName %>Service.get();
        ///////////////////////////////
        function helloWorld() {
            return 'Hello World';
        }
    }
})();
