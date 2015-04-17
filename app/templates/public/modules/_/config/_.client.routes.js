(function() {
    'use strict';

    angular
        .module('<%= camelizedSingularName %>')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    /**
     * Route Configuration to establish url patterns for the module
     * @param {Function} $stateProvider
     */
    function routesConfig($stateProvider) {
        // <%= humanizedSingularName %> state routing
        $stateProvider.
            state('<%= baseStatePath %>', {
                url: '/<%= appname %>',
                controller: '<%= camelizedSingularName %>Controller as <%= camelizedSingularName %>',
                templateUrl: '<%= appname %>/modules/<%= appname %>/views/<%= camelizedSingularName %>.client.view.html'<% if (isSiteAware() === false) { %>,
                parent: 'nav-layout'<% } %>
            });
    }
})();
