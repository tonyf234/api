const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const router = require('./routers/router')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

const env_path = path.resolve(__dirname, './../.env');
require('dotenv').config({ path: env_path });

app.use(router);
app.use((req, res, next) => {
	res.status(404).send('Not Found');
});

sequelize
	.sync({ force: process.env.NODE_ENV !== 'production' })
	.then(result => {
		const PORT = parseInt(process.env.PORT) || 3000
		app.listen(PORT);
		console.log(`app running on port ${PORT}`);
	})
	.catch(err => console.log(err));
