const express = require ('express')
const app = express()
const PORT = process.env.PORT || 3001
const exphbs = require ('express-handlebars')
const helpers = require ('./utils/helpers')
const htmlRoutes = require("./controllers/html-routes")
const path = require("path")
const hbs = exphbs.create({helpers})

app.engine('handlebars', hbs.engine); //setting up hbs
app.set('view engine', 'handlebars'); //setting up hbs

app.use(express.json()); //formatting/parcing requests coming in into json format
app.use(express.urlencoded({ extended: true })); //changing the format of the url (replacing % w/ space)
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", htmlRoutes)
app.listen (PORT, () => {
    console.log("Server is Listening") //turning server on
})