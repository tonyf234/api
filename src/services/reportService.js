const Report = require('./../entities/reportEntity');

const reportTypes = ['nature', 'obstacle', 'infrastructure', 'dumping', 'association'];

exports.getAllReports = () => {
    return Report.findAll();
};

exports.getReportId = (id) => {
    return Report.findOne({ where: { id }});
}

exports.getReportsUserId = (userId) => {
    return Report.findOne({ where : { userId } });
};

exports.createReport = async (type, date, lon, lat, userId) => {

    let missingFields = {};
    if (!type || typeof type !== 'string')
        missingFields.type = `type must be a valid type ${reportTypes}`;
    if (date && ! date instanceof Date)
        missingFields.date = 'date must be a Date';
    if (lon && typeof lon !== 'number')
        missingFields.lon = 'lon must be a number';
    if (lat && typeof lat !== 'number')
        missingFields.lat = 'lat must be a number';
    if (!userId || typeof userId !== 'number')
        missingFields.userId = 'userId must be a number';

    if (Object.entries(missingFields).length)
        throw new Error(JSON.stringify(missingFields));

    let report;

    try {
        report = await Report.create({type, date, lon, lat, userId});

        await report.save()
    } catch (e) {
        console.log(e);
        return 0;
    }

    return report.id;
};
