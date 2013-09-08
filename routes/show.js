// show user profile
var mongoose = require("mongoose");
var models = mongoose.models;

exports.show = function(req, res){
	if (req.user) {
		res.render('./users/show', {
			title: 'Welcome',
			user: req.user
		});
	}

	else { res.render('./users/new'); }
};
