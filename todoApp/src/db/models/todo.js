const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    
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
    },
    owner:{
        type: Schema.Types.ObjectId, ref: 'users' ,
        require:true,

    },
    filePath:{
        type:String,
        default: "no file"
    },
    fileName:{
        type:String,
        default: "no file"
    }

})

module.exports = mongoose.model('todos',TodoSchema);