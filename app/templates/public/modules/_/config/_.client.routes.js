(function() {
    'use strict';

    angular
        .module('<%= camelizedName %>')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    /**
     * Route Configuration to establish url patterns for the module
     * @param {Function} $stateProvider
     */
    function routesConfig($stateProvider) {
        // <%= humanizedName %> state routing
        $stateProvider.
            state('<%= baseStatePath %>', {
                url: '/<%= appname %>',
                controller: '<%= classifiedName %>Controller as <%= camelizedName %>',
                templateUrl: 'lib/<%= appname %>/public/modules/<%= appname %>/views/<%= camelizedName %>.client.view.html'<% if (isSiteAware() === false) { %>,
                parent: 'nav-layout'<% } %>
            });
    }
})();
