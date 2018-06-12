const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	content: {type: String, default: ''},
	createdBy: {type: String},
	active: {type: Boolean, default: true}
}, {
	timestamps: {createdAt: 'created_at'}
});

const ImageModel = new Schema({
	url: {type: String, required: true},
	title: {type: String, default: ''},
	description: {type: String, default: ''},
	view: {type: Number, default: 0},
	like: {type: Number, default: 0},
	active: {type: Boolean, default: true},
	createdBy: {type: String},
	comments: {type: [CommentSchema], default: []}
}, {
	timestamps: {createdAt: 'created_at'}
});

module.exports = mongoose.model('Images', ImageModel);


