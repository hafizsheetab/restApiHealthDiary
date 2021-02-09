const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema( {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String
    },
    time: {
        type: Date,
    }
})

module.exports = mongoose.model('message',MessageSchema)