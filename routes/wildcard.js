// catches invalid url links

exports.redirect = function(req, res){
	return res.render('./users/invalid', { title: 'invalid url' })
};