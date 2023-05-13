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

router.get("/favorites", async (req, res) => {
    try{
        console.log ("Test")
        res.render("favorites")
    } catch(err){
        console.log(err)
    }
})

router.post('/addToFavorite',(req,res)=>{
    console.log(req.body);
   res.status(200).json("Success")
})
module.exports = router