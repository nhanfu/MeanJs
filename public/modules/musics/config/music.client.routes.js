'use strict';

// Setting up route
angular.module('musics').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listMusics', {
			url: '/musics',
			templateUrl: 'modules/musics/views/list-music.client.view.html'
		}).
		state('createMusic', {
			url: '/musics/create',
			templateUrl: 'modules/musics/views/create-music.client.view.html'
		}).
		state('viewMusic', {
			url: '/musics/:musicId',
			templateUrl: 'modules/musics/views/view-music.client.view.html'
		}).
		state('editMusic', {
			url: '/musics/:musicId/edit',
			templateUrl: 'modules/musics/views/edit-music.client.view.html'
		});
	}
]);