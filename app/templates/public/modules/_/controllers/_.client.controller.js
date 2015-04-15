(function() {
    'use strict';

    angular
        .module('<%= appname %>')
        .controller('<%= classifiedPluralName %>Controller', <%= classifiedPluralName %>Controller);

    <%= classifiedPluralName %>Controller.$inject = ['<%= classifiedPluralName %>Service'];
    /**
     * Controller for <%= humanizedSingularName %>
     */
    function <%= classifiedPluralName %>Controller(<%= classifiedPluralName %>Service) {
        var vm = this;
        vm.helloWorld = helloWorld;
        vm.helloWorldService = <%= classifiedPluralName %>Service.get();
        ///////////////////////////////
        function helloWorld() {
            return 'Hello World';
        }
    }
})();