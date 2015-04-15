(function() {
    'use strict';

    angular
        .module('<%= appname %>')
        .filter('<%= camelizedSingularName %>', <%= camelizedSingularName %>);

    function <%= camelizedSingularName %>() {
        return function(input) {
            // <%= humanizedPluralName %> filter logic
            // ...

            return '<%= camelizedSingularName %> filter: ' + input;
        };
    }
})();