const Router = require('express')
const router = Router()

const Installation = require('../models/installation')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
//initialisation de flash
router.use(flash())


router.use(Router.json())
router.use(bodyParser.urlencoded({extended:false}))

//router.use((req, res, next)=> {
//    res.locals.currentUser = req.user
//  next()  
//})


router.post("/profile.html",(req,res,next) => {
    
    const installation = new Installation({
        ...req.body
    }) 

    //console.log(installation)
    //res.status(201).json({message : 'Installation enregistrée'})
    installation.save()
        .then(() => res.status(201).json({message : 'Installation enregistrée'}))
        .catch((error) => res.status(400).json({error}))
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error", "Espace protegé, merci de vous authentifier")
        res.sendFile(__dirname + "/Dashio/login.html")
    }
}

module.exports = router