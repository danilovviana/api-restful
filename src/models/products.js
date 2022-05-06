const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    brand: Number,
    price: String,

})

// MVC - MODEL VIEW CONTROLLER
const Model = mongoose.model('products', schema)

module.exports = Model