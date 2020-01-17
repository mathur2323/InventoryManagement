const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    userUuid:{
        type:String,
        required:true,
        unique:true
    },
    products:{
        type:[{
            title: String,
            quantity: String,
            category: String
        }]
    }
})

module.exports = Product = mongoose.model('product', ProductSchema);