const express = require('express');
const router = express.Router();
var User = require('./models/user');	//Importo el modelo creado para User

router.get('/', function(req, res) {
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
})

router.post('/register', function(req, res) {
	User.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function(err, user) {
		if(err) {
			return console.error(err);
		} else {
			console.log('Crea: ' + user);
			User.find(function(err, users) {
				if(err) {
					return console.error(err);
				} else {
					res.redirect('/');
				}
			});
		}
	});
})

module.exports = router;