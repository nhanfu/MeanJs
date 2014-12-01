'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(function (req, res) {
			articles.list(req, res);
		})
		.post(users.requiresLogin, articles.create);

	app.route('/articles/create')
		.post(function (req, res) {
			articles.create(req, res);
		});
	
	app.route('/articles/createForm')
		.get(function (req, res) {
			console.log('test');
			articles.createForm(req, res);
		});

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};