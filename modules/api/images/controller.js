const ImageModel = require('./model');

const listImages = () => new Promise((resolve, reject) => {
	ImageModel
		.find({active: true})
		.then(images => resolve(images))
		.catch(e => reject(e));
});

const listImagesByPage = (pageNumber) => new Promise((resolve, reject) => {
	ImageModel
		.find({active: true})
		.sort({createdAt: -1})
		.skip((pageNumber - 1) * 25)
		.limit(25)
		.exec()
		.then(images => resolve(images))
		.catch(e => reject(e));
});

const createImage = ({url, title, description, createdBy}) => new Promise((resolve, reject) => {
	ImageModel
		.create({url, title, description, createdBy})
		.then(imageCreated => resolve(imageCreated._id))
		.catch(e => reject(e));
});

const updateImage = (imageId, {url, title, description, active}) => new Promise((resolve, reject) => {
	ImageModel
		.findByIdAndUpdate(imageId, {url, title, description, active})
		.then(imageUpdated => resolve(imageUpdated._id))
		.catch(e => reject(e));
});

const deleteImage = (imageId) => new Promise((resolve, reject) => {
	ImageModel
		.findByIdAndUpdate(imageId, {active: false})
		.then(imageUpdated => resolve(imageUpdated._id))
		.catch(e => reject(e));
});

const updateLike = (imageId, vote) => new Promise((resolve, reject) => {
	ImageModel
		.findById(imageId)
		.then(imageFound => {
			if (vote === 'like') imageFound.like +=1;
			else imageFound.like -= 1;

			return imageFound.save();
		})
		.then(imageUpdated => resolve(imageUpdated._id))
		.catch(e => reject(e));
});

module.exports = {listImages, listImagesByPage, createImage, updateImage, deleteImage, updateLike};

//Todo comment view