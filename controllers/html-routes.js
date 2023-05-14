const router = require ('express').Router()

// default route - homepage
router.get("/", async (req, res) => {
    try{
        // renders "homepage" handlebar; prompts the user to sign-in or log-in
        // (Needed?) also checks if user is logged in
        res.render("homepage", {
            // logged_in: req.session.logged_in
        });

        
    } catch(err){
        console.log(err)
    }
})
  
// If the user is already logged in, redirect the request to the "/songs" page
router.get('/login', (req, res) => {
    console.log(req.session)
    // if (req.session.logged_in) {
    //     res.redirect('/songs');
    //     return;
    // }

    res.render('login');
});

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