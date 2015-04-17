(function() {
    'use strict';

    angular
        .module('<%= camelizedSingularName %>')
        .controller('<%= camelizedSingularName %>Controller', <%= camelizedSingularName %>Controller);

    <%= camelizedSingularName %>Controller.$inject = ['<%= camelizedSingularName %>Service'];
    /**
     * Controller for <%= humanizedSingularName %>
     */
    function <%= camelizedSingularName %>Controller(<%= camelizedSingularName %>Service) {
        var vm = this;
        vm.helloWorld = helloWorld;
        vm.helloWorldService = <%= camelizedSingularName %>Service.get();
        ///////////////////////////////
        function helloWorld() {
            return 'Hello World';
        }
    }
})();
