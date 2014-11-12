var Todo = require('./models/todo');
var User = require('./models/user');

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

	// register user
	app.post('/api/user/register', function(req, res){
		var name = req.body.user.username;
		var pass = req.body.user.password;
		console.log('register: ' + name + ' ' + pass);
		res.end("end");
	});
	// login user
	app.post('/api/user/login', function(req, res){
		var name = req.body.user.username;
		var pass = req.body.user.password;
		console.log('login: ' + name + ' ' + pass);
		res.end("end");
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});
};