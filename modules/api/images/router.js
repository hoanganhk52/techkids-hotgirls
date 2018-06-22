const express = require('express');
const Router = express.Router();
const ImageController = require('./controller');

Router.get('/', (req, res) => {
	ImageController.listImagesByPage(req.query.page || 1)
		.then(images => res.status(200).send({success: 1, images}))
		.catch((err) => res.status(500).send({success: 0, err}));
});

Router.post('/', (req, res) => {
	ImageController.createImage(req.body)
		.then(imageCreatedId => res.status(201).send({success: 1, imageCreatedId}))
		.catch((err) => res.status(500).send({success: 0, err}));
});

Router.put('/:id/:vote', (req, res) => {
	let imageId = req.params.id;
	let vote = req.params.vote;

	ImageController.updateLike(imageId, vote)
		.then(imageId => res.status(200).send({success: 1, imageId}))
		.catch(err => res.status(500).send({success: 0, err}));
});

module.exports = Router;