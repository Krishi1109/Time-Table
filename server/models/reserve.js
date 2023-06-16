const mongoose = require('mongoose')

const ReserveSchema = new mongoose.Schema({
    sem:{
        type:Number,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    slot:{
        type:Number,
        required:true
    },
    activity:{
        type:String
    }
}) 

const Reserve = mongoose.model('reserve', ReserveSchema)

module.exports = Reserve