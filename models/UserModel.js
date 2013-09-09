var mongoose = require("mongoose");
var models = mongoose.models;

exports.init = function() {
	var UserSchema = mongoose.Schema({
		name: {
			type: String,
			required: true,
			trim: true,
			match: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			match: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			trim: true,
			match: /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
		},
		password: {
			type: String,
			required: true
		}
	});

	UserSchema.methods.validPassword = function(password) {
		if (this.password !== password) {
			return false;
		}

		return true;
	};

	mongoose.model('Users', UserSchema);

	return mongoose.models;
};