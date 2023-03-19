// Load the logs model
const CaptainsLog = require('../models/logs')

//logArray data for seeding
const seedLogs = require('../models/seedLogs')

const express = require('express')

// Creates our router
const router = express.Router()

// I.N.D.U.C.E.S  ->  an acronym that helps remember how to properly order routes
// Index, New, Delete, Update, Create, Edit, Show


// "index" route & controller for '/logs' 
router.get('/', async (req, res) => {
    // res.render('index')

    try {
        // Use the fruit model to interact with the database
        // find will get all documents from the fruit collection
        const results = await CaptainsLog.find()
        console.log(results)

        // Looks in the views folder for "Index" and passes { fruits } data to the view (kind of like a server props object)
        res.render('Index', { results })
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
});

// "new" route and controller for '/logs/new'
router.get('/new', (req, res) => {
    res.render('New')
});


// "Delete" & clear route and controller to "delete" & "clear" all data from log collection
router.delete('/clear', async (req, res) => {
    console.log('DELETE /logs/clear')

    try {
        await CaptainsLog.deleteMany({})
        res.redirect('/logs')
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
});

// "delete" route and controller for  -- '/logs/:id'
router.delete('/:id', async (req, res) => {
    try {
        await CaptainsLog.findByIdAndDelete(req.params.id)
        res.redirect('/logs')
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
});

// "update" put route and controller for a PUT/POST for updating a specific log - '/logs/:id'
router.put('/:id', async (req, res) => {
    console.log('PUT /fruits/:id')
    console.log(req.body)

    if (req.body.shipIsBroken) {
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }

    //  method for db connection
    try {
        // Find the document in the database by the id, and update it with the request from the body
        await CaptainsLog.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/logs/${req.params.id}`)
    } catch (err) {
        console.log(err)
        res.send(err.message)

    }

});


// "create" post route and controller to "seed" for repopulating our database
router.post('/seed', async (req, res) => {
    console.log('POST /fruits/seed')

    try {
        await CaptainsLog.deleteMany({})
        await CaptainsLog.create(seedLogs)
        res.redirect('/logs')
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
});



// "create" post route and controller for '/logs/'
router.post('/', async (req, res) => {
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

// "edit"route and controller for '/:id/edit
router.get('/:id/edit', async (req, res) => {
    console.log('GET /logs/:id/edit')
    //new method for db connection
    try {
        const result = await CaptainsLog.findById(req.params.id)
        res.render('Edit', { result })
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
});


// "show" route and controller for '/:id'
router.get('/:id', async (req, res) => {
    try {
        const result = await CaptainsLog.findById(req.params.id)
        console.log(result)
        res.render('Show', { result })
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }

});

module.exports = router