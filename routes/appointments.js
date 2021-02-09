const express = require('express')
const auth = require('../auth')
const router = express.Router()
const Appointment = require('../Models/Appointment')

router.get('/patient',auth,async(req, res) => {
    let appointments = await Appointment.find({patient: req.user._id})
    appointments = await Promise.all(appointments.map(appointment => populateAppointment(appointment)))
    res.json(appointments)
})
router.get('/doctor',auth,async(req, res) => {
    let appointments = await Appointment.find({doctor: req.user._id})
    appointments = await Promise.all(appointments.map(appointment => populateAppointment(appointment)))
    res.json(appointments)
})

router.get('/:appointmentId', async(req, res) => {
    let{user} = req.body
    let appointment = await Appointment.findById(req.params.appointmentId)
    appointment = await populateAppointment(appointment)
})
router.put('/:appointmentId/confirm', async(req, res) => {
    let{user} = req.body
    let appointment = await Appointment.findById(req.params.appointmentId)
    appointment.confirmed.status = true
    appointment.confirmed.on = Date.now()
    await appointment.save()
    appointment = await populateAppointment(appointment)
    res.json(appointment)
})
router.put('/:appointmentId/complete', async(req, res) => {
    let{user} = req.body
    let appointment = await Appointment.findById(req.params.appointmentId)
    appointment.completed.status = true
    appointment.completed.on = Date.now()
    await appointment.save()
    appointment = await populateAppointment(appointment)
    res.json(appointment)
})


router.post('/', async(req, res) => {
    let{patient, doctor, time} = req.body
    let appointment = new Appointment({
        doctor: doctor.user._id,
        patient: patient.user._id,
        time
    })
    await appointment.save()
    appointment = await populateAppointment(appointment)
    res.json(appointment)
})

const populateAppointment = async (appointment) => {
    await appointment.populate([{path: 'doctor', select: 'name email'}, {path: 'patient', select: 'name email'}]).execPopulate()
    return appointment
} 

module.exports = router