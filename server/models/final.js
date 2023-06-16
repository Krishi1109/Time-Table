const mongoose = require('mongoose')

const FinalSchema = new mongoose.Schema({
    slot: {
        type: Number

    },

    f31: {
        type: String
    },
    f32: {
        type: String
    },
    f33: {
        type: String
    },
    f34: {
        type: String
    },
    s31: {
        type: String
    },
    s32: {
        type: String
    },
    s33: {
        type: String
    },
    s34: {
        type: String
    },
    type3: {
        type: String

    },
    f51: {
        type: String
    },
    f52: {
        type: String
    }
    ,
    f53: {
        type: String
    },
    f54: {
        type: String
    },
    s51: {
        type: String
    },
    s52: {
        type: String
    },
    s53: {
        type: String
    },
    s54: {
        type: String
    },
    type5: {
        type: String

    },
    f71: {
        type: String
    },
    f72: {
        type: String
    }
    ,
    f73: {
        type: String
    },
    f74: {
        type: String
    },
    s71: {
        type: String
    },
    s72: {
        type: String
    },
    s73: {
        type: String
    },
    s74: {
        type: String
    },
    type7: {
        type: String

    },
    odd: {
        type: Boolean,
        default: false
    }

})

const Final = mongoose.model('final', FinalSchema)

module.exports = Final