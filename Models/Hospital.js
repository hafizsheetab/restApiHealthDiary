const mongoose = require('mongoose')

const HospitalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address:{
        type: String,
        required: true
    },
    departments: [
        {
            value: {
                type: String
            }
        }
    ],
})

module.exports = Hospital = mongoose.model('hospital',HospitalSchema)