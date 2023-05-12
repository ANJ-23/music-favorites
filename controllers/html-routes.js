const router = require ('express').Router()

router.get("/", async (req, res) => {
    try{
        res.render("homepage")
    } catch(err){
        console.log(err)
    }
})

router.get("/dashboard", async (req, res) => {
    try{
        console.log ("Test")
        res.render("dashboard")
    } catch(err){
        console.log(err)
    }
})

module.exports = router