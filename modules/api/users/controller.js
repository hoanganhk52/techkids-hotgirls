const UserModel = require('./model');
const bcrypt = require('bcrypt');

const listUsers = () => new Promise((resolve, reject) => {
	UserModel
		.find({active: true})
		.then(users => resolve(users))
		.catch(e => reject(e));
});

// const listImagesByPage = (pageNumber) => new Promise((resolve, reject) => {
// 	ImageModel
// 		.find({active: true})
// 		.sort({createdAt: -1})
// 		.skip((pageNumber - 1) * 25)
// 		.limit(25)
// 		.exec()
// 		.then(images => resolve(images))
// 		.catch(e => reject(e));
// });

const create = ({username, password, email, name, avatar}) => new Promise((resolve, reject) => {
	UserModel
		.create({username, password, email, name, avatar})
		.then(userCreated => resolve(userCreated._id))
		.catch(e => reject(e));
});

const update = (userId, {password, email, name, avatar}) => new Promise((resolve, reject) => {
	UserModel
		.findById(userId)
		.then(userFound => {
			if(password) userFound.passwordChange = password;
			if(email) userFound.email = email;
			if(name) userFound.name = name;
			if(avatar) userFound.avatar = avatar;

			return userFound.save();
		})
		.then(userUpdated => resolve(userUpdated._id))
		.catch(e => reject(e));
});

const getUserInfo = (userId) => new Promise((resolve, reject) => {
	UserModel
		// .findById(userId, "name avatar username")
		.findById(userId, "-password -active")
		.then(userFound => resolve(userFound))
		.catch(e => reject(e));
});

const deleteUser = (userId) => new Promise((resolve, reject) => {
	UserModel
		.findByIdAndUpdate(userId, {active: false})
		.then(userUpdated => resolve(userUpdated._id))
		.catch(e => reject(e));
});

module.exports = {create, update, getUserInfo, deleteUser, listUsers};

//Todo comment view like