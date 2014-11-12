var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

module.exports = mongoose.model('User', {
	name: String,
	pass: String,
	salt: String
});

