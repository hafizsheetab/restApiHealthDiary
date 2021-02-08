const express = require('express')
const router = express.Router()
const Appointment = require('../Models/Appointment')

router.get('/:userType', async(req, res) => {
    let{user} = req.body
    let appointments = req.params.userType === 'doctor' ? await Appointment.find({doctor: user._id}) : await Appointment.find({patient: user._id})
    res.json(appointments);
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
    let{user, doctor, time} = req.body
    let appointment = new Appointment({
        doctor: doctor.user._id,
        patient: user._id,
        time
    })
    await appointment.save()
    appointment = await populateAppointment(appointment)
    res.json(appointment)
})

const populateAppointment = async (appointment) => {
    appointment.populate([{path: 'doctor', select: 'name email'}, {path: 'patient', select: 'name email'}]).execPopulate()
    return appointment
} 

module.exports = router