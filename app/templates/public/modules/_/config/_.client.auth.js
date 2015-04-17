(function() {
    'use strict';

    // Setting up route
    angular
        .module('<%= camelizedName %>')
        .run(runBlock);

    runBlock.$inject = ['$state', '$rootScope', 'authUtils'];

    function runBlock($state, $rootScope, authUtils) {

        $rootScope.$on('$stateChangeStart', stateChangeStart);

        function stateChangeStart(event, toState, toParams) {
            if (_.startsWith(toState.name, '<%= baseStatePath %>') && !authUtils.canAccess(toParams, '{siteCode}.<%= camelizedName %>')) {
                event.preventDefault();
                $state.go('home');
            }
        }
    }
})();
