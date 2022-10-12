const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./utils/database');
const router = require('./routers/router')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
	secret: 'secret string jfslkfjklsdfjkldjskl',
	store: new SequelizeStore({
		db: sequelize,
	}),
	resave: false,
	saveUninitialized: false,
	// cookies: {...},
	// proxy: true,
}));

const env_path = path.resolve(__dirname, './../.env');
require('dotenv').config({ path: env_path });

app.use(router);

sequelize
	.sync({ force: process.env.NODE_ENV === 'development' })
	.then(result => {
		const PORT = parseInt(process.env.PORT) || 8000
		app.listen(PORT);
		console.log(`app running on port ${PORT}`);
	})
	.catch(err => console.log(err));
