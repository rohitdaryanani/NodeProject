
/**
 * Module dependencies.
 */

var express = require('express');
var crypto = require('crypto');
var passport = require("passport");
var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'helloExpress'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Database stuff

mongoose.connect("mongodb://localhost/helloExpress");

var UserModel = require('./models/UserModel').init();
var Users = UserModel.Users;

mongoose.connection.on("error", function (err) {
	if(err) {
		return console.log("No connection to database");
	}
});

/**
 * Passport
 */

passport.use(new LocalStrategy(
	function(username, password, done) {
		Users.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});


// Routes

var index = require("./routes/new");
var users = require("./routes/users");
var show = require("./routes/show");
var edit = require("./routes/edit");
var update = require("./routes/update");
var drop = require("./routes/drop");
var login = require("./routes/login");
var logout = require("./routes/logout");
var wildcard = require("./routes/wildcard");
var count = require("./routes/count");

// Welcome page 
app.get("/", index.welcome);

//Index view all user
app.get("/users", users.view);

// // Create
app.post("/users", users.create);

//Login
app.post("/users/login", login.page);

app.param('name', function(req, res, next, name) {
	Users.find({name: name}, function(err, docs) {
		if (req.user) {
			if (name === req.user.name) {
				req.user = docs[0];
			}
		}

		next();
	});
});

// LogOut
app.get("/users/logout", logout.logout);

// Show user profile
app.get("/users/:name", show.show);

// Edit
app.get("/users/:name/edit", edit.edit);

// Update
//app.put("/users/:name", update.update);
app.put("/users/:name", function(req, res) {
	var b = req.body;

	Users.update({name: req.params.name},{
		 name: req.user.name,
		// username: b.username,
		email: b.email,
		password: b.password},
		//password: crypto.createHash("sha1").update(b.password).digest("base64")},
		function(err) {
			if (err) return res.render('./users/invalid', { title: "Something went wrong please try again" });
			res.redirect("/users/" + req.user.name);
		}
	);
});

// Delete
app.delete("/users/:name", drop.delete);

// Catches invalid url links
app.get('/:wildcard', wildcard.redirect);

//count
app.post("/users/count", count.count);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

