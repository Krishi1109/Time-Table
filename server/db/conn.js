const mongoose = require('mongoose')
const DB = "mongodb+srv://krishi:krishi@cluster0.koepe.mongodb.net/timetable?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`Connection Successfull`);
}).catch((err) => {
    console.log(`No connection`);
})