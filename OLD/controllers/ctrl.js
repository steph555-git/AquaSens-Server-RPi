const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/model')
const userValidation = require('../validation/validation')


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.inscription = (req, res )=> {

    // Recuperation des données d'inscription

    const {body} = req
        console.log(body)
    //Validation des données
    const{error} = userValidation(body).userValidationSignUp
    if(error) return res.status(401).json(error.details[0].message)

    //hash du mdp - crypter le mot de passe avant de la mettre en base
    bcrypt.hash(body.password, 10)
        .then(hash => {
            if(!hash) return res.status(500).json({msg: "Server erreur"})

        delete body.password
        new User({...body, password : hash})
        .save()

        .then((user) => {
            console.log(user)
            res.status(201).json({msg: "Utilisateur "+ body.email +" créé avec succés"}) 
            //res.redirect('/')
        })
        .catch((error) => res.status(500).json(error))

    })
    .catch((error) => res.status(500).json(error))

}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.connexion = (req, res )=> {
    //Recuperation des données de connexion
    const {email,password} = req.body
    console.log(req.body)
    //validation des données
    const {error} = userValidation(req.body).userValidationLogin
    if(error) return res.status(401).json(error.details[0].message)
//
    //trouver le bon user dans la BDD
    User.findOne({email : email})
        .then (user => {
            if(!user) return res.status(404).json({msg : "L'utilisateur n'existe pas"})
        // Verification du MDP
        bcrypt.compare(password, user.password)
//
        .then(match => {
            if(!match) return res.status(500).json({msg : "Server error"})
            res.status(200).json({
                email : user.email,
                id : user._id,
                token : jwt.sign({id : user._id},"Secret_KEY", {expiresIn :"12h"})
            })
            console.log("Utilisateur [" + req.body.email + "] authentifié")
            res.sendFile(process.cwd() + "/dashboard.html")
        })
        .catch(error => res.status(500).json(error))
//
    })
    .catch(error => res.status(500).json(error))

  
}
