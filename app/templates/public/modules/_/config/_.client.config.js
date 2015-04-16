(function() {
    'use strict';

    angular
        .module('<%= appname %>')
        .run(runBlock);
    runBlock.$inject = ['SidebarMenu', 'MenuEntry'];
    /**
     * runBlock to configure the module menu
     */
    function runBlock(SidebarMenu, MenuEntry) {
        var menuEntry = new MenuEntry('<%= humanizedSingularName %>', '<%= appname %>', '<%= baseStatePath %>');
        SidebarMenu.add(menuEntry);
    }
})();
