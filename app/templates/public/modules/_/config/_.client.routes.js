(function() {
    'use strict';

    angular
        .module('<%= appname %>')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider'];
    /**
     * Route Configuration to establish url patterns for the module
     * @param {Function} $stateProvider
     */
    function routesConfig($stateProvider) {
        // <%= humanizedPluralName %> state routing
        $stateProvider.
            state('<%= baseStatePath %>', {
                url: '/<%= appname %>',
                controller: '<%= classifiedPluralName %>Controller as <%= camelizedPluralName %>Controller',
                templateUrl: '<%= appname %>/modules/<%= appname %>/views/<%= appname %>.client.view.html'
            });
    }
})();
