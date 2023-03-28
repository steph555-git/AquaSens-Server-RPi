const calendarGET = require('../businessLogic/getQuery')

const calendarGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await calendarGET()
    const templateData = { title: 'AquaSens | Calendar', resultsGETQuery }
    res.render('calendar', templateData);
}

module.exports = calendarGETCtrl
