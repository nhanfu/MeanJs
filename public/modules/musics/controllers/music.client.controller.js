'use strict';

angular.module('musics').controller('MusicsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Musics',
	function($scope, $stateParams, $location, Authentication, Musics) {
		var self = $scope;
		$scope.authentication = Authentication;
		$scope.creating = false;
		$scope.title = '';
		$scope.content = '';
		
		$scope.showHideForm = function () {
			$scope.creating = !$scope.creating;
		};

		$scope.create = function() {
			var music = new Musics({
				title: this.title,
				content: this.content
			});
			this.title = '';
			this.content = '';
			music.$save(function(response) {
				$scope.musics.push(music);
				$scope.creating = !$scope.creating;

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(music) {
			if (music) {
				music.$remove();

				for (var i in $scope.musics) {
					if ($scope.musics[i] === music) {
						$scope.musics.splice(i, 1);
					}
				}
			} else {
				$scope.music.$remove(function() {
					$location.path('musics');
				});
			}
		};

		$scope.turnEditMode = function (music) {
			var currentEditMode = music.editMode;
			music.editMode = !currentEditMode;
			music.buttonText = !currentEditMode? 'Save': 'Edit';

			if (!music.editMode) {
				// save data when finish edit
				music.$update(function () {
					music.editMode = false;
					music.buttonText = 'Edit';
				});
			}
		};

		$scope.update = function() {
			var music = $scope.music;

			music.$update(function() {
				$location.path('musics/' + music._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.musics = Musics.query();
			$scope.musics.$promise.then(function (musics) {
				for (var i = 0, j = musics.length; i < j; i++) {
					musics[i].editMode = false;
					musics[i].buttonText = 'Edit';
				}
			});
		};

		$scope.findOne = function(music) {
			if (!music) {
				$scope.music = Musics.get({
					musicId: $stateParams.musicId
				});
			} else {
				$scope.music = music;
			}
		};
	}
]);