const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    
    owner:{
        type: String,
        required:true,
    },
    
    text:{
        type:String,
         require:true,
    },

    date:{
        type: Date,
        required: true,
    },
    goalDate:{
        type: Date,
    },
    done:{
        type: Boolean,
        default:false,
    }

})

module.exports = mongoose.model('todos',TodoSchema);