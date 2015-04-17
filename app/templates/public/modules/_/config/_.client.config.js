(function() {
    'use strict';

    angular
        .module('<%= camelizedSingularName %>')
        .run(runBlock);
    runBlock.$inject = ['SidebarMenu', 'MenuEntry'];
    /**
     * runBlock to configure the module menu
     */
    function runBlock(SidebarMenu, MenuEntry) {
        var menuEntry = new MenuEntry('<%= humanizedSingularName %>', '<%= camelizedSingularName %>', '<%= baseStatePath %>');
        SidebarMenu.add(menuEntry);
    }
})();
