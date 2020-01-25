var User = require('./models/user');	//Importo el modelo creado para User

const requireUser = async (req, res, next) => {
	const userId = req.session.userId;
	if(userId) {
		const user = await User.findOne({ _id: userId });
		res.locals.user = user;
		next();
	} else {
		return res.redirect('/login');
	}
}

module.exports = requireUser;