(function() {
    'use strict';

    angular
        .module('<%= appname %>')
        .directive('<%= camelizedSingularName %>', <%= camelizedSingularName %>);
    <%= camelizedSingularName %>.$inject = [];
    function <%= camelizedSingularName %>() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: link
        };
        function link(scope, element) {
            // <%= humanizedPluralName %> directive logic
            // ...

            element.text('this is the <%= camelizedSingularName %> directive');
        }
    }
})();
