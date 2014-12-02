'use strict';

//musics service used for communicating with the musics REST endpoints
angular.module('musics').factory('Musics', ['$resource',
	function($resource) {
		return $resource('musics/:musicId', {
			musicId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);