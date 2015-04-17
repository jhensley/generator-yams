(function() {
    'use strict';

    angular
        .module('<%= camelizedName %>')
        .directive('<%= camelizedName %>', <%= camelizedName %>);
    <%= camelizedName %>.$inject = [];
    function <%= camelizedName %>() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: link
        };
        function link(scope, element) {
            // <%= humanizedName %> directive logic
            // ...

            element.text('this is the <%= camelizedName %> directive');
        }
    }
})();
