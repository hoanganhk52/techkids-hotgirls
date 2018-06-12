const express = require('express');
const Router = express.Router();
const UserController = require('./controller');

Router.get('/:id', (req, res) => {
	UserController.getUserInfo(req.params.id)
		.then(userFound => res.status(200).send({success: 1, user: userFound}))
		.catch((err) => res.status(500).send({success: 0, err}));
});

Router.post('/', (req, res) => {
	UserController.create(req.body)
		.then(userCreatedId => res.status(201).send({success: 1, user: userCreatedId}))
		.catch((err) => res.status(500).send({success: 0, err}));
});

Router.put('/:id', (req, res) => {
	UserController.update(req.params.id, req.body)
		.then(userUpdated => res.status(200).send({success: 1, user: userUpdated}))
		.catch((err) => res.status(500).send({success: 0, err}));
});

module.exports = Router;