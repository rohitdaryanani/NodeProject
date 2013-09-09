var https = require("https");
//var express = require("express");
//var name = req.body.username;

exports.count = function(req, res) {{ 
	console.log(req.body);
	getRepos(req.body.name, function(repos){
		console.log(req.body.name + " has " + repos.length + " repos");
		res.render("./users/count", {title: req.body.name + " has " + repos.length + " repos "});
	});

	function getRepos(username, callback) {

		var options = {
			host: 'api.github.com',
			path: '/users/' + username + '/repos',
			method: 'GET'
		};

		var request = https.request(options, function(res) {
			var body = '';
			res.on("data", function(chunk){
				body += chunk.toString('utf8');
			});
			res.on("end", function(){
				var repos = [];
				var json = JSON.parse(body);
				json.forEach(function(repo) {
					repos.push({
						name: repo.name,
						description: repo.description
					});
				});

				callback(repos);
			});
		});
		request.end();
	}


	// getRepos(req.body.name, function(repos){
	// 	console.log(repos.length + " repos");
	// 	res.render("./users/count", {title: repos.length});
	// });

}};
