const express = require('express');
const Router = express.Router();
const AuthController = require('./controller');

Router.post('/login', (req, res) => {
	AuthController.login(req.body).then((userInfo) => {
		req.session.user = userInfo;
		res.send({success: 1, user: userInfo})
	}).catch((e) => {
		res.status(e.statusCode).send({success:0, err: e.err})
	});
});

Router.post('/logout', (req, res) => {
	if(req.session.user) {
		req.session.destroy(err => {
			if (err) console.log(err);
			res.redirect('/');
		});
	} else {
		res.status(400).send({success: 0});
	}

});

module.exports = Router;