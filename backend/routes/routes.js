const express = require('express')
const router = express.Router()

const indexGETCtrl = require('../controllers/index.GET.ctrl')
const profileGETCtrl = require('../controllers/profile.GET.ctrl')
const { profileGeneralUPDATECtrl, profileInstallationUPDATECtrl } = require('../controllers/profile.UPDATE.ctrl')
const mapGETCtrl = require('../controllers/map.GET.ctrl')
const contactsGETCtrl = require('../controllers/contacts.GET.ctrl')
const contactUsGETCtrl = require('../controllers/contactUs.GET.ctrl')
const chartsGETCtrl = require('../controllers/charts.GET.ctrl')
const calendarGETCtrl = require('../controllers/calendar.GET.ctrl')
const sensorsTemperatureAPI = require('../api/sensorsTemperature')

router.route('/')
    .get(indexGETCtrl)

router.route('/map')
    .get(mapGETCtrl)

router.route('/profile')
    .get(profileGETCtrl)
router.route('/profile/general')
    .put(profileGeneralUPDATECtrl)
router.route('/profile/installation')
    .put(profileInstallationUPDATECtrl)

router.route('/charts')
    .get(chartsGETCtrl)

router.route('/calendar')
    .get(calendarGETCtrl)

router.route('/contacts')
    .get(contactsGETCtrl)

router.route('/contact-us')
    .get(contactUsGETCtrl)

router.route('/sensors/temperature')
    .get(sensorsTemperatureAPI)

router.route('*')
    .get((req, res) => req.render('../views/404.html'))

module.exports = router;




