const express = require('express');
const Router = express.Router();
const AuthController = require('./controller');

Router.post('/', (req, res) => {
	AuthController.login(req.body).then((userInfo) => {
		req.session.user = userInfo;
		res.send({success: 1, user: userInfo})
	}).catch((e) => {
		res.status(e.statusCode).send({success:0, err: e.err})
	});
});

module.exports = Router;