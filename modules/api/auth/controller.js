const UserModel = require('../users/model');
const bcrypt = require('bcrypt');

const login = ({username, password}) => new Promise((resolve, reject) => {
	UserModel.findOne({username})
		.then(userFound => {
			if (!userFound || !userFound.password) {
				reject({
					statusCode: 400,
					err: "Wrong username"
				});
			} else {
				bcrypt.compare(password, userFound.password)
					.then(compareResult => {
							if (compareResult) {
								resolve({
									username: userFound.username,
									userId: userFound._id
								});
							} else {
								reject({
									statusCode: 401,
									err: "Wrong password"
								})
							}
						}
					);
			}
		})
		.catch(err => reject({
			statusCode: 500,
			err
		}))
});

module.exports = {login};