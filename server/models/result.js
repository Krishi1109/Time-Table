const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
    sem:{
        type:Number,
        required:true
    },
    slot:{
        type:Number,
        required:true
    },
    fname:{
        type:String
    },
    sub:{
        type:String
    }, 
    type:{
        type:String
    }
}) 

const Result = mongoose.model('result', ResultSchema)

module.exports = Result