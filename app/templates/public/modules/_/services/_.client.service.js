(function() {
    'use strict';

    // User Permissions service used for communicating with the users REST endpoint
    angular
        .module('<%= camelizedSingularName %>')
        .factory('<%= classifiedSingularName %>Service', <%= classifiedSingularName %>Service);

    <%= classifiedSingularName %>Service.$inject = ['$resource'];

    function <%= classifiedSingularName %>Service($resource) {
        return $resource('/<%= appname %>/hello-world');
    }
})();
