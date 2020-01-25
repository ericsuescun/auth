const express = require('express');
const app = express();
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-3', { useNewUrlParser: true });

mongoose.connection.on("error", function(e) { console.error(e); });

var UserSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String
});


UserSchema.statics.authenticate = async function(email, password, next) {
	const user = await mongoose.model("User").findOne({ email: email });

	if(user) {
		console.log('Desde el modelo user: email: ' + user.email + ' password: ' + user.password);
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if(err) reject(err);
				console.log('Resultado del bcrypt: ' + result);
				resolve(result === true ? user : null);
			});
		});
	}
	return null;
};

module.exports = mongoose.model("User", UserSchema);