const express = require('express');
const app = express();
const router = express.Router();
var User = require('./models/user');	//Importo el modelo creado para User
var requireUser = require('./requireuser');
var bcrypt = require('bcrypt');
var mongoose = require("mongoose");

app.set('view engine', 'pug');
app.set('views', './views');

router.get('/', requireUser, function(req, res) {
	res.header("Content-Type", "text/html; charset=utf-8");
	
	User.find(function(err, users) {
		if(err) {
			return console.error(err);
		} else {
			res.render('index', { users: users });
		}
	})
});

router.get('/register', function(req, res) {
	res.render('form');
});

router.post('/register', function(req, res) {
	var password;
	bcrypt.hash(req.body.password, 10).then(function(hash) {
		console.log(hash);
		User.create({ name: req.body.name, email: req.body.email, password: hash }, function(err, user) {
			if(err) {
				return console.error(err);
			} else {
				console.log('Crea: ' + user + ' Pasword hash: ' + user.password);
				User.find(function(err, users) {
					if(err) {
						return console.error(err);
					} else {
						res.redirect('/');
					}
				});
			}
		});
	});
	
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.post('/login', async function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.authenticate(email, password);
		console.log('Desde la forma: Email: ' + email + ' Password: ' + password);
		console.log('User desde authenticate: ' + user);
		if(user) {
			console.log('User ID: ' + user._id);
			req.session.userId = user._id;
			return res.redirect('/');
		} else {
			console.log("Wrong email or password. Try again!");
			res.render('login', { error: "Wrong email or password. Try again!" } );
			// res.redirect('/login' );
		}
	} catch(e) {
		return next(e);
	}
});

router.get('/logout', function(req, res) {
	req.session.userId = null;
	res.redirect('/');
});

module.exports = router;