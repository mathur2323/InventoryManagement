const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    country:{
        type:String,
        required:false
    }
})

module.exports = Item = mongoose.model('user', UserSchema);