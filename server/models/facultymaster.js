const mongoose = require('mongoose')

const FacultyMasterSchema = new mongoose.Schema({
    slot :{
        number : String,
        fname
    }
}) 

const FacultyMaster = mongoose.model('facultymaster', FacultyMasterSchema)

module.exports = FacultyMaster