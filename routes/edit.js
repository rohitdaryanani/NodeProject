// edit user profile ready for update
var mongoose = require("mongoose");
var models = mongoose.models;


exports.edit = function(req, res) {
	var Users = models.Users;

	Users.find({}, function(err, docs) {
		res.render("users/edit", {user: req.user});
	});
};




