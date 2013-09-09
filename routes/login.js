var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require("mongoose");
var models = mongoose.models;


exports.page = function(req, res, next){
	var Users = models.Users;
	passport.authenticate('local', function(err, user, info) {
		if (err) { return res.render('./users/signuperror', { title: 'Fields not valid' }); }

		if (!user) { return res.render('./users/signuperror', { title: 'Wrong Username/Email and password combination.' }); }

		req.logIn(user, function(err) {
			if (err) { return res.send('Bad Request'); }

			else { res.redirect('/users/' + req.user.name); }
		});
	})(req, res, next);
};