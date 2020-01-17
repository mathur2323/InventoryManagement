const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    userUuid:{
        type:String,
        required:true,
        unique:true
    },
    categories:{
        type: [{
            name:String,
            slug:String,
            status:Boolean,
            createdDate:String
        }],
        // required:true
    }
})

module.exports = Category = mongoose.model('category', CategorySchema);