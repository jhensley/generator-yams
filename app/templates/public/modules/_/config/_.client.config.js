(function() {
    'use strict';

    angular
        .module('<%= camelizedName %>')
        .run(runBlock);
    runBlock.$inject = ['SidebarMenu', 'MenuEntry'];
    /**
     * runBlock to configure the module menu
     */
    function runBlock(SidebarMenu, MenuEntry) {
        var menuEntry = new MenuEntry('<%= humanizedName %>', '<%= camelizedName %>', '<%= baseStatePath %>');
        SidebarMenu.add(menuEntry);
    }
})();
