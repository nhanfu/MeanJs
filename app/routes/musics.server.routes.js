'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	musics = require('../../app/controllers/musics.server.controller');

module.exports = function(app) {
	// music Routes
	app.route('/musics')
		.get(function (req, res) {
			musics.list(req, res);
		})
		.post(users.requiresLogin, musics.create);

	app.route('/musics/create')
		.post(function (req, res) {
			musics.create(req, res);
		});
	
	app.route('/musics/createForm')
		.get(function (req, res) {
			console.log('test');
			musics.createForm(req, res);
		});

	app.route('/musics/:musicId')
		.get(musics.read)
		.put(users.requiresLogin, musics.hasAuthorization, musics.update)
		.delete(users.requiresLogin, musics.hasAuthorization, musics.delete);

	// Finish by binding the music middleware
	app.param('musicId', musics.musicByID);
};