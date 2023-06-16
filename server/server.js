const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors');
const PORT = process.env.PORT || 5000

require('./db/conn')
const Teacher = require("./models/teacher")

const app = express()
// app.use(bodyparser.json())
app.use(cors())

app.use(express.json());
// app.use(cookieparser()) 
app.use(express.urlencoded({extended:false}));

app.use(require('./routes/web'))


app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`);
})