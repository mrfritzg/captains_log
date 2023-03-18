//require dotENV
require('dotenv').config();

//Load express
const express = require('express');

const connectDB = require('./config/db')

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


// I.N.D.U.C.E.S  ->  an acronym that helps remember how to properly order routes
// Index, New, Delete, Update, Create, Edit, Show

//index route
app.get('/logs', async (req, res) => {
    // res.render('index')

    try {
        // Use the fruit model to interact with the database
        // find will get all documents from the fruit collection
        const results = await CaptainsLog.find()
        console.log(results)

        // Looks in the views folder for "fruits/Index" and passes { fruits } data to the view (kind of like a server props object)
        res.render('Index', { results })
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
});

//Setup an "new" route
app.get('/logs/new', (req, res) => {
    res.render('New')
});

// Setup a "delete" route
app.delete('/logs/:id', async (req, res) => {
    try {
        await CaptainsLog.findByIdAndDelete(req.params.id)
        res.redirect('/logs')
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
});

// Setup a POST "update" route for updating a specific log
app.put('/logs/:id', async (req, res) =>{
    console.log('PUT /fruits/:id')
    console.log(req.body)

    if (req.body.shipIsBroken) {
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }

    //new method for db connection
    try {
    // Find the document in the database by the id, and update it with the request from the body
    await CaptainsLog.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/logs/${req.params.id}`)
    } catch(err) {
        console.log(err)
        res.send(err.message)

    }

})

// Setup an "create" route
app.post('/logs', async (req, res) => {
    //  res.send('received')
    if (req.body.shipIsBroken) {
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }

    // res.send(req.body)

    try {
        // use the model to interact with db and create a new document in the fruit collection
        const result = await CaptainsLog.create(req.body)
        console.log(result)
        res.redirect('/logs')
        // res.render('Show', { result })
    } catch (err) {
        console.log('error')
    }

});

// Edit Route
app.get('/logs/:id/edit', async (req, res) => {
    console.log('GET /logs/:id/edit')
    //new method for db connection
    try {
        const result = await CaptainsLog.findById(req.params.id)
        res.render('Edit', { result })
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }  
});


// Setup an "show" route for fruits, attach it to router along with the controller logic
app.get('/logs/:id', async (req, res)=> {
    try {
        const result = await CaptainsLog.findById(req.params.id)
        console.log(result)
        res.render('Show', { result })
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }

});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT)
})