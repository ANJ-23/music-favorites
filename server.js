const express = require ('express')
const app = express()
const PORT = process.env.PORT || 3001
const exphbs = require ('express-handlebars')
const helpers = require ('./utils/helpers')
const routes = require("./controllers/")
const apiRoutes = require('./')
const path = require("path")
const sequelize = require('./config/connection')
const hbs = exphbs.create({helpers})
const { Sequelize } = require('sequelize');
//const { create } = require('./models/favorites')

app.engine('handlebars', hbs.engine); //setting up hbs
app.set('view engine', 'handlebars'); //setting up hbs

app.use(express.json()); //formatting/parcing requests coming in into json format
app.use(express.urlencoded({ extended: true })); //changing the format of the url (replacing % w/ space)
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });