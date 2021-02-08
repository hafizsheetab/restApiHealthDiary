const mongoose =  require('mongoose')

const DoctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    ],
    experiences: [
        {
            hospitalName: {
                type: String
            },
            specialization: {
                type: String
            },
            duration: {
                fromDate: {
                    type: Date
                },
                toDate: {
                    type: Date
                },
                isStillWorking: {
                    type: Boolean
                }
            }
        }
    ]
})

module.exports = Doctor = mongoose.model('doctor',DoctorSchema)