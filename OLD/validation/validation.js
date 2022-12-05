const joi = require('joi')

function userValidation (body) {

    const userValidationSignUp = joi.object({
        email : joi.string().email().trim().required(),
        password : joi.string().min(6).required()
    })

    const userValidationLogin = joi.object({
        email : joi.string().email().trim().required(),
        password : joi.string().min(6).required()
    })
    return {
        userValidationSignUp : userValidationSignUp.validate(body),
        userValidationLogin : userValidationLogin.validate(body)
    }
}

module.exports = userValidation

