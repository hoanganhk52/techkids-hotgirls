const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const session = require('express-session');
const ImageRouter = require('./modules/api/images/router');
const UserRouter = require('./modules/api/users/router');
const AuthRouter = require('./modules/api/auth/router');
const port = 3000;

const app = express();

app.use(session({
	secret: 'dsncnmsdkmcoapsdcmsdcnaiocslclssdcsdc2332rffv3',
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		maxAge: 24 * 60 * 60 * 1000
	}
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/images', ImageRouter);
app.use('/api/users', UserRouter);
app.use('/api/auth', AuthRouter);

app.get('/', (req, res) => {
	console.log(req.sessionID);
	res.send('hello world');
});

app.listen(port, (err) => {
	if (!err) console.log(`server is on port ${port}`);
});