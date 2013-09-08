// Get and displays all the users

var mongoose = require("mongoose");
var models = mongoose.models;

exports.view = function(req, res) {
	var Users = models.Users;

	Users.find({}, function(err, docs) {
		res.render("users/index", {users: docs});
	});
};


exports.create = function(req, res) {
	var Users = models.Users;
	var b = req.body;

	var u = new Users({
		name: b.name,
		username: b.username,
		email: b.email,
		password: b.password
		//password: crypto.createHash("sha1").update(b.password).digest("base64")
	});
	u.save(function(err, user) {
		if (err) res.json(err);

		res.redirect("/users/" + user.name);
	});

};
