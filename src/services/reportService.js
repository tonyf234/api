const Report = require('./../entities/reportEntity');

exports.createReport = (type, date, lon, lat, userId) => {
    const report Report.create({ type, date, lon, lat, userId});

};
