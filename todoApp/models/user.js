const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    email:{
        type:String,
        unique: true,
        trim:true,
        minlength:3,
        required:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6,
    },
    notifications:{
        type:Boolean,
        default: false,
    },

    name:{
        type:String,
        required: true,
        minlength:1,
    },
    sendingHour:{
        type:Number,
        min: 00,
        max: 23,
        default: 00
        
    }


});


module.exports = mongoose.model('users',UserSchema);