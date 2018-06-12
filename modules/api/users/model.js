const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserModel = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, default: ''},
	email: {type: String, unique: true},
	avatar: {type: String, default: ''},
	active: {type: Boolean, default: true},
});

UserModel.pre('save', function (next) {
	console.log(this);
	console.log(this.passwordChange);

	if (this.passwordChange || !this.__v) {
		const saltRounds = 10;
		const myPlaintextPassword = this.passwordChange || this.password;

		bcrypt.genSalt(saltRounds)
			.then(salt => bcrypt.hash(myPlaintextPassword, salt))
			.then(password => {
				this.password = password;
				next();
			})
			.catch(e => {console.log(e);})
	} else next();
});

module.exports = mongoose.model('User', UserModel);