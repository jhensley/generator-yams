(function() {
    'use strict';

    // User Permissions service used for communicating with the users REST endpoint
    angular
        .module('<%= camelizedName %>')
        .factory('<%= classifiedName %>Service', <%= classifiedName %>Service);

    <%= classifiedName %>Service.$inject = ['$resource'];

    function <%= classifiedName %>Service($resource) {
        return $resource('/<%= appname %>/hello-world');
    }
})();
