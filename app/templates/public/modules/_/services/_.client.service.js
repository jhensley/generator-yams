(function() {
    'use strict';

    // User Permissions service used for communicating with the users REST endpoint
    angular
        .module('<%= camelizedSingularName %>')
        .factory('<%= camelizedSingularName %>Service', <%= camelizedSingularName %>Service);

    <%= camelizedSingularName %>Service.$inject = ['$resource'];

    function <%= camelizedSingularName %>Service($resource) {
        return $resource('/<%= appname %>/hello-world');
    }
})();
