const reportService = require('./../services/reportService');

const checkUserId = (req, res) => {
    if (req.session.userId > 0)
        return true;
    res.status(400).send('session userId is invalid');
    return false;
}

exports.getAllReports = async (req, res, next) => {
    res.status(200).send(await reportService.getAllReports());
};

exports.getMyReports = async (req, res, next) => {
    if (!checkUserId(req, res))
        return;

    const userId = req.session.userId;
    res.status(200).send(await reportService.getReportsUserId(userId));
};

exports.sendReport = async (req, res, next) => {
    if (!checkUserId(req, res))
        return;

    const type = req.body.type;
    const date = req.body.date;
    const lon = req.body.lon;
    const lat = req.body.lat;
    const userId = req.session.userId;

    let missingFields = {}
    if (!type || typeof type !== 'string')
        missingFields.type = 'type must be a string';

    if (Object.entries(missingFields).length)
        res.status(400).send(missingFields);

    let reportId;
    try {
        reportId = reportService.createReport(type, date, lon, lat, userId)
    }
    catch (e) {
        console.log('failed to create report', e);
        const errorString = e.toString().split('Error: ')[1]
        const errorObj = JSON.parse(errorString);
        return res.status(400).send(errorObj);
    }

    if (reportId)
        return res.status(200).send(await reportService.getReportId(reportId));

    return res.status(400).send('failed to create report');
};
