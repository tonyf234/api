const sequelize = require('./database')

const sessionCount = async () => {
    const [results, metadata] = await sequelize.query("SELECT count(*) FROM Sessions");
    const result = results[0];
    const count = result['count(*)'];
    return count;
};

module.exports = sessionCount;
