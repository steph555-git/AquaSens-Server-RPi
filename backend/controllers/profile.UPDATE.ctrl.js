const express = require('express')
const bodyParser = require('body-parser')
const db = require('../app')
const app = express()
app.use(bodyParser.json())

const profileGeneralUPDATE = async (req, res) => {
    try {
        const usersCollection = db.db.collection('users')

        const options = { upsert: true }
        const updateDataProfileGeneral = req.body

        console.log(updateDataProfileGeneral)
        await usersCollection.updateOne({ username: 'horlogerie@alabonneheure.fr' }, { $set: updateDataProfileGeneral }, options)
        return res.status(200).send(`General data profile has been updated`)
    }
    catch (e) {
        console.log(e)
    }
}

const profileInstallationUPDATE = async (req, res) => {
    try {
        const usersCollection = db.db.collection('users')

        const options = { upsert: true }
        const updateDataProfileInstallation = req.body

        console.log(updateDataProfileInstallation)
        await usersCollection.updateOne({ username: 'horlogerie@alabonneheure.fr' }, { $set: updateDataProfileInstallation }, options)
        return res.status(200).send(`Installation data profile has been updated`)
    }
    catch (e) {
        console.log(e)
    }
}

const profileGeneralUPDATECtrl = async (req, res, next) => {
    await profileGeneralUPDATE(req, res)
}

const profileInstallationUPDATECtrl = async (req, res, next) => {
    await profileInstallationUPDATE(req, res)
}
module.exports = { profileGeneralUPDATECtrl, profileInstallationUPDATECtrl }
