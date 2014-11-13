var Todo = require('./models/todo');
var User = require('./models/user');
var bcrypt = require('bcrypt');

module.exports = function(app) {
	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {
		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// check username exist
	app.post('/api/user/exist', function(req, res){
		var name = req.body.user.username;
		User.findOne({'name': name}, function(err, user){
			//if(err)	throws err;
			res.json(user);
		});
	});

	// register user
	app.post('/api/user/register', function(req, res){
		var name = req.body.user.username;
		var pass = req.body.user.password;
		var user = new User({'name': name, 'pass': pass});
		bcrypt.genSalt(12, function(err, salt){
			//if(err)	return next(err);
			user.salt = salt;
			bcrypt.hash(user.pass, salt, function(err, hash){
				//if(err)	return next(err);
				user.pass = hash;
				user.save(function(err){
					if(err) console.log('err: ' + err);
					res.json(user);
				});
			}); 
		});
	});
	// login user
	app.post('/api/user/login', function(req, res){
		var name = req.body.user.username;
		var pass = req.body.user.password;
		console.log(name + ":" + pass);
		User.findOne({'name': name}, function(err, user){
			if(user == null)	res.json(null);
			else {
				bcrypt.hash(pass, user.salt, function(err, hash){
					if(user.pass == hash){
						res.json(user);
					} else {
						res.json(null);
					}
				}); 
			}	
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};