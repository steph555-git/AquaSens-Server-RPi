const passport = require('passport')
const {Router} = require('express')

const {inscription, connexion } = require ('../controllers/ctrl')
const router = Router()


router.get("/",(req,res) => {
    res.sendFile(process.cwd() + "/Dashio/login.html")
})

router.post('/Dashio/register.html', inscription)
router.post('/', connexion)

router.use(passport.authenticate("jwt", {session : false}))
//router.get('/',(req, res) => {
//    res.send('Route protégé')
//})

module.exports = router

