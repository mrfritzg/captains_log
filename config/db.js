const mongoose = require('mongoose');
const db = process.env.Mongo_URI;

// console.log(db)
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        })
        console.log('Mongoose conncted ...')
    } catch (err) {
        console.error(err.message);
    }
}
module.exports = connectDB;
