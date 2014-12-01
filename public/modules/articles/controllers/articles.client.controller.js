'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.turnEditMode = function (article) {
			var currentEditMode = article.editMode;
			article.editMode = !currentEditMode;
			article.buttonText = !currentEditMode? 'Save': 'Edit';

			if (!article.editMode) {
				// save data when finish edit
				article.$update(function () {
					article.editMode = false;
					article.buttonText = 'Edit';
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
			$scope.articles.$promise.then(function (articles) {
				for (var i = 0, j = articles.length; i < j; i++) {
					articles[i].editMode = false;
					articles[i].buttonText = 'Edit';
				}
			});
		};

		$scope.findOne = function(article) {
			if (!article) {
				$scope.article = Articles.get({
					articleId: $stateParams.articleId
				});
			} else {
				$scope.article = article;
			}
		};
	}
]);