const mongoose =  require('mongoose')

const DoctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital'
    },
    department:{
        type: String,
    },
    dateOfBirth: {
        type: Date,

    },
    contactNo: {
        type: String,
    },
    qualifications: [
        {
            name: {
                type: String,
                
            },
            passingDate: {
                type: Date,
                
            },
            passingSchool: {
                type: String
            }
        }
    ]
})

module.exports = Doctor = mongoose.model('doctor',DoctorSchema)