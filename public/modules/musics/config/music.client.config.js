'use strict';

// Configuring the Articles module
angular.module('musics').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Musics', 'musics', 'dropdown', '/musics(/create)?');
		Menus.addSubMenuItem('topbar', 'musics', 'List Albums', 'musics');
	}
]);