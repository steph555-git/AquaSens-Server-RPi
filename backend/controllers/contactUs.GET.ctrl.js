const contactUsGET = require('../businessLogic/getQuery')

const contactUsGETCtrl = async (req, res, next) => {
    const resultsGETQuery = await contactUsGET()
    const templateData = { title: 'AquaSens | Contact Us', resultsGETQuery }
    res.render('contact-us', templateData);
}

module.exports = contactUsGETCtrl
