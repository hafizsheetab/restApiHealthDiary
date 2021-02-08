const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    height: {
        type: String
    },
    weight: {
        type: String
    },
    contactNo: {
        type: String
    },
    age: {
        type: String
    },
    bloodGroup: {
        type: String,
    }
})

module.exports = Patient = mongoose.model('patient',PatientSchema)