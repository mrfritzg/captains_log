//require dotENV
require('dotenv').config();

//Load express
const express = require('express');

const connectDB = require('./config/db')

//Load our log route
const logRoutes = require('./controllers/logs')

//create our expess app
const app = express()

const PORT = 8081;

//connect to our database
connectDB();

// Load the logs model
const CaptainsLog = require('./models/logs')

// npm install jsx-view-engine react react-dom
const { createEngine } = require('jsx-view-engine');

// Load the method-override middleware
const methodOverride = require('method-override')

// Configure the view engine and look for files ending in jsx
app.set('view engine', 'jsx')

// Create the engine and accept files ending in jsx
app.engine('jsx', createEngine())

// a middleware that formats the form data (currently a string that looks like query params) into a object we can use
app.use(express.urlencoded({ extended: true }))

// hack into our form and give it more HTTP methods (like DELETE and PUT)
app.use(methodOverride('_method'))


// look for static files (like css) in the public folder
app.use(express.static('public'))



//connect the route/controller logic here
app.use('/logs', logRoutes);

// I.N.D.U.C.E.S  ->  an acronym that helps remember how to properly order routes
// Index, New, Delete, Update, Create, Edit, Show

//index route
// app.get('/logs', LogController.index);

// //Setup an "new" route
// app.get('/logs/new', LogController.new);

// // Setup a "delete" route
// app.delete('/logs/:id', LogController.delete );

// // Setup a POST "update" route for updating a specific log
// app.put('/logs/:id', LogController.update)

// // Setup an "create" route
// app.post('/logs', LogController.create );

// // Edit Route
// app.get('/logs/:id/edit', async (req, res) => {
//     console.log('GET /logs/:id/edit')
//     //new method for db connection
//     try {
//         const result = await CaptainsLog.findById(req.params.id)
//         res.render('Edit', { result })
//     } catch(err) {
//         console.log(err)
//         res.send(err.message)
//     }  
// });


// // Setup an "show" route for fruits, attach it to router along with the controller logic
// app.get('/logs/:id', async (req, res)=> {
//     try {
//         const result = await CaptainsLog.findById(req.params.id)
//         console.log(result)
//         res.render('Show', { result })
//     } catch(err) {
//         console.log(err)
//         res.send(err.message)
//     }

// });

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})