const express = require ('express')
const app = express()
const PORT = process.env.PORT || 3001
const exphbs = require ('express-handlebars')
const helpers = require ('./utils/helpers')
const htmlRoutes = require("./controllers/html-routes")
const path = require("path")
const hbs = exphbs.create({helpers})
const { Sequelize } = require('sequelize');
//const { create } = require('./models/favorites')

app.engine('handlebars', hbs.engine); //setting up hbs
app.set('view engine', 'handlebars'); //setting up hbs

app.use(express.json()); //formatting/parcing requests coming in into json format
app.use(express.urlencoded({ extended: true })); //changing the format of the url (replacing % w/ space)
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", htmlRoutes)
app.listen (PORT, () => {
    console.log("Server is Listening") //turning server on
})

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('my_database', 'belane@localhost', 'newpassword', {
    host: 'localhost',
    dialect: 'mysql'
  });

  
//   async function createDbConnection(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
//   }
//   createDbConnection();


// sequelize.authenticate().then(()=>{
// console.log('connection created successfully')
// }).catch((error)=>{
//     console.log(error)
// })