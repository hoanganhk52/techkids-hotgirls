const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/techkid', (err) => {
	if (err) console.log(err);
	else console.log('DB connect success!');
});

module.exports = mongoose;