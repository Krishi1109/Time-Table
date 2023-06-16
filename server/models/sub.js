const mongoose = require('mongoose')

const SubSchema = new mongoose.Schema({
    sem:{
        type:Number,
        required:true
    },
    sub:{
        type:String,
        required:true
    }
}) 

const Sub = mongoose.model('subject', SubSchema)

module.exports = Sub