 const mongoose = require('mongoose')

 const AppointmentSchema = new mongoose.Schema({
     doctor: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
     },
     patient: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
     },
     confirmed: {
         status: {
             type: Boolean,
             default: false
         },
         on: {
             type: Date
         }
     },
     time: {
        type: Date,
     },
     diagnosis:{
        type: String,
    
    },
    prescription: {
        type: String,
        
    },
    completed: {
        status: {
            type: Boolean,
            default: false
        },
        on: {
            type: Date
        }
    }
 })

 module.exports = Appointment = mongoose.model('Appointment',AppointmentSchema)