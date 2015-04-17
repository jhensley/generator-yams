(function() {
    'use strict';

    angular
        .module('<%= camelizedSingularName %>')
        .directive('<%= camelizedSingularName %>', <%= camelizedSingularName %>);
    <%= camelizedSingularName %>.$inject = [];
    function <%= camelizedSingularName %>() {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: link
        };
        function link(scope, element) {
            // <%= humanizedSingularName %> directive logic
            // ...

            element.text('this is the <%= camelizedSingularName %> directive');
        }
    }
})();
