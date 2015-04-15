(function() {
    'use strict';

    // Setting up route
    angular
        .module('<%= appname %>')
        .run(runBlock);

    runBlock.$inject = ['$state', '$rootScope', 'authUtils'];

    function runBlock($state, $rootScope, authUtils) {

        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeStart(event, toState, toParams) {
            if (_.startsWith(toState.name, '<%= baseStatePath %>') && !authUtils.canAccess(<% if (isSiteAware) { %>toParams.siteCode, <% } %>'<%= appname %>')) {
                event.preventDefault();
                $state.go('home');
            }
        }
    }
})();
