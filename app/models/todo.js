var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	name : String,
	done : Boolean,
	text : {type : String, default: ''}
});