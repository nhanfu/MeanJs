'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Music = mongoose.model('Music'),
	_ = require('lodash');


exports.createForm = function (req, res) {
	res.render('createForm');
};
/**
 * Create a music
 */
exports.create = function(req, res) {
	var music = new Music(req.body);
	music.user = req.user;

	music.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(music);
		}
	});
};

/**
 * Show the current music
 */
exports.read = function(req, res) {
	res.json(req.music);
};

/**
 * Update a music
 */
exports.update = function(req, res) {
	var music = req.music;

	music = _.extend(music, req.body);

	music.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(music);
		}
	});
};

/**
 * Delete an music
 */
exports.delete = function(req, res) {
	var music = req.music;

	music.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(music);
		}
	});
};

/**
 * List of musics
 */
exports.list = function(req, res) {
	Music.find().sort('-created').populate('user', 'displayName').exec(function(err, musics) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(musics);
		}
	});
};

/**
 * music middleware
 */
exports.musicByID = function(req, res, next, id) {
	Music.findById(id).populate('user', 'displayName').exec(function(err, music) {
		if (err) return next(err);
		if (!music) return next(new Error('Failed to load music ' + id));
		req.music = music;
		next();
	});
};

/**
 * music authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.music.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};