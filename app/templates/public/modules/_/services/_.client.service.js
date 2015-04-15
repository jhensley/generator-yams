(function() {
    'use strict';

    // User Permissions service used for communicating with the users REST endpoint
    angular
        .module('<%= appname %>')
        .factory('<%= classifiedPluralName %>Service', <%= classifiedPluralName %>Service);

    UserPermissions.$inject = ['$resource'];

    function UserPermissions($resource) {
        return $resource('/<%= appname %>/hello-world');
    }
})();