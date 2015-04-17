(function() {
    'use strict';

    angular
        .module('<%= camelizedSingularName %>')
        .filter('<%= camelizedSingularName %>', <%= camelizedSingularName %>);

    function <%= camelizedSingularName %>() {
        return function(input) {
            // <%= humanizedSingularName %> filter logic
            // ...

            return '<%= camelizedSingularName %> filter: ' + input;
        };
    }
})();
