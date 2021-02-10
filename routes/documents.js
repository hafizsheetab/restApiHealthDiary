const express = require('express')
const Doctor = require('../Models/Doctor')
const Patient = require('../Models/Patient')
const pdf = require('html-pdf')
const fs = require('fs')
const router = express.Router()

const pdfTemplate = require('../documents')
const Appointment = require('../Models/Appointment')
router.get('/:appointmentId',async(req, res) => {
    let appointment = await Appointment.findById(req.params.appointmentId)
    let patient = await Patient.findOne({user: appointment.patient._id})
    let doctor = await Doctor.findOne({user: appointment.doctor._id})
    doctor = await populateDoctor(doctor)
    patient = await populatePatient(patient)
    let pdfData = {
        doctorsName: doctor.user.name,
        doctorsPhone: doctor.contactNo,
        doctorsEmail: doctor.user.email,
        medicines: appointment.medicines,
        patientsName: patient.user.name,
        patientsAge: patient.age,
        patientsPhoneNo: patient.contactNo,
        diagnosis: appointment.diagnosis,
        appointmentId: appointment._id,
        appointmentDate: appointment.time
    }
    pdf.create(pdfTemplate(pdfData)).toFile('./routes/prescription.pdf', (err) => {
        if(err) {
            res.send(err.message);
        }
        res.sendFile(`${__dirname}/prescription.pdf`)
       
    });
    
})
router.delete('/',async(req, res) => {
    fs.unlinkSync(`${__dirname}/prescription.pdf`)
})
const populateDoctor = async(doctor) => {
    await doctor.populate({path: 'user', select: 'name email'}).execPopulate()
    return doctor;
}

const populatePatient = async (patient) => {
    await patient.populate({path: 'user', select: 'name email'}).execPopulate()
    return patient;
}
module.exports = router