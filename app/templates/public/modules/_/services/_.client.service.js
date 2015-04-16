(function() {
    'use strict';

    // User Permissions service used for communicating with the users REST endpoint
    angular
        .module('<%= appname %>')
        .factory('<%= classifiedPluralName %>Service', <%= classifiedPluralName %>Service);

    <%= classifiedPluralName %>Service.$inject = ['$resource'];

    function <%= classifiedPluralName %>Service($resource) {
        return $resource('/<%= appname %>/hello-world');
    }
})();
