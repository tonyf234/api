const path = require('path');

const env_path = path.resolve(__dirname, './../../.env');
require('dotenv').config({ path: env_path });

module.exports = (req, res, next) => {
    if (process.env.NODE_ENV === 'development')
        return res.status(404).send('Not Found\nPlease check method and endpoint...');
    if (process.env.NODE_ENV === 'test')
        return res.status(404).send('Not Found\nError in test file (check method and endpoint...)');
    return res.status(404).send('Not Found');
};
