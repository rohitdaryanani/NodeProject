//update user profile from edit
var mongoose = require("mongoose");
var models = mongoose.models;

// 	var b = req.body;

// 	Users.update({name: req.params.name},{
// 		name: b.name,
// 		username: b.username,
// 		email: b.email,
// 		password: b.password},
// 		//password: crypto.createHash("sha1").update(b.password).digest("base64")},
// 		function(err) {
// 			res.redirect("/users/" + b.name);
// 		}
// 	);
// });

exports.update = function(req, res) {
	var Users = models.Users;
	var b = req.body;

	var u = new Users({name: req.params.name},{
		name: b.name,
		username: b.username,
		email: b.email,
		password: b.password
		//password: crypto.createHash("sha1").update(b.password).digest("base64")
	});
	u.update(function(err, user) {
		if (err) res.json(err);

		res.redirect("/users/" + user.name);
	});

};