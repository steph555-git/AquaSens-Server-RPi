const express = require('express')
const router = express.Router()
const userCtrl = require('../ctrl/user')

//Route vers les fonctions d'authentification
router.route("/register")
    .get(userCtrl.getRegister)
    .post(userCtrl.postRegister)

router.route("/login")
    .get(userCtrl.getLogin)
    .post(userCtrl.postLogin)

router.route("/logout")
    .get(userCtrl.getLogout)

router.route("/forgot")
    .post(userCtrl.postForgot)

router.route("/reset/:token")
    .get(userCtrl.getResetPassword)

module.exports = router
