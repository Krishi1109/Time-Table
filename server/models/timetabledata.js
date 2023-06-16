const mongoose = require('mongoose')

const TimetableSchema = new mongoose.Schema({
    sem:{
        type:Number,
        required:true
    },
    fname : {
        type:String,
        required:true
    },
    sub : {
        type:String,
        required:true
    },
    lec:{
        type:Number,
        required:true
    },
    lab:{
        type:Number,
        required:true
    }
}) 

const Timetable = mongoose.model('timetable', TimetableSchema)

module.exports = Timetable