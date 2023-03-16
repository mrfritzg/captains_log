//require dotENV
require('dotenv').config();

//Load express
const express = require('express');

// const connectDB = require('./config/db')

//create our expess app
const app = express()

const PORT = 8081;

//connect to our database
// connectDB();

// npm install jsx-view-engine react react-dom
const {createEngine} = require('jsx-view-engine');

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


//Setup an "root" route
app.get('/', (req, res) => {
    res.render('New')
});

// Setup an "create" route
app.post('/logs', (req, res) => {
    // res.send('received')
    if (req.body.shipIsBroken) {
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }

    res.send(req.body)
});

app.listen(PORT, () => {
    console.log('Listening on port '+ PORT)
})