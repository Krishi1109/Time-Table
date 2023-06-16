const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
}) 

const Teacher = mongoose.model('teacher', TeacherSchema)

module.exports = Teacher