(function() {
    'use strict';

    angular
        .module('<%= camelizedName %>')
        .filter('<%= camelizedName %>', <%= camelizedName %>);

    function <%= camelizedName %>() {
        return function(input) {
            // <%= humanizedName %> filter logic
            // ...

            return '<%= camelizedName %> filter: ' + input;
        };
    }
})();
