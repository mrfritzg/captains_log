// Load mongoose
const mongoose = require('mongoose')

// Pointing to the schema property (shortcut) (Schema is a class)
const Schema = mongoose.Schema

// Instantiate a new Schema object for fruit and structure our data
const logsSchema = new Schema({
    title: {
        // expecting the "name" property to be a string
        type: String,
        // validation to make sure the data is legit 
        required: true
    },
    entry: { type: String, required: true },
    shipIsBroken: { type: Boolean, default: true }
    },{ 
    timestamps: true }
    )

// create our model using our logsSchema and give our collection a name of "logs"
const CaptainsLog = mongoose.model('captainsLog', logsSchema)

// exporting the CaptainsLog model as a module
module.exports = CaptainsLog;