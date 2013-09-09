//udelete users profile

var mongoose = require("mongoose");
var models = mongoose.models;

exports.delete = function(req, res) {
	var Users = models.Users;
	Users.remove({name: req.params.name}, function(err) {
		res.redirect("/");
	});
};