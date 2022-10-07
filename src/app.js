const path = require('path');

const express = require('express');
const sequelize = require('./utils/database');

const app = express();

const env_path = path.resolve(__dirname, './../.env');
require('dotenv').config({ path: env_path });
console.log('env_path', env_path);

app.use((req, res, next) => {
	res.send('Hello world!');
});

sequelize
	.sync({ force: process.env.NODE_ENV !== 'production' })
	.then(result => {
		const PORT = parseInt(process.env.PORT) || 3000
		app.listen(PORT);
		console.log(`app running on port ${PORT}`);
	})
	.catch(err => console.log(err));
