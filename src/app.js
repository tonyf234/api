const express = require('express');
const sequelize = require('./utils/database');

const app = express();

app.use((req, res, next) => {
	res.send('Hello world!');
});

sequelize
	.sync({ force: true })
	.then(result => {
		const PORT = process.env.PORT || 3000
		app.listen(PORT);
		console.log(`app running on port ${PORT}`);
	})
	.catch(err => console.log(err));
