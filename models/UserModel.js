var mongoose = require("mongoose");
var models = mongoose.models;

exports.init = function() {
	var UserSchema = mongoose.Schema({
		name: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			unique: true
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