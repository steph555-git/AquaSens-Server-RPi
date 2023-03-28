const chartsGET = require('../businessLogic/getQuery')

const chartsGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await chartsGET()
    const templateData = { title: 'AquaSens | Charts', resultsGETQuery }
    res.render('charts', templateData);
}

module.exports = chartsGETCtrl
