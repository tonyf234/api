const express = require('express');
const sequelize = require('./utils/database');

const app = express();

app.use((req, res, next) => {
	res.send('Hello world!');
});

sequelize
	.sync({ force })
	.then(result => {
		app.listen(3000);
	})
	.catch(err => console.log(err));
