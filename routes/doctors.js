const express = require('express')
const router = express.Router()
const Doctor = require('../Models/Doctor')
const Appointment = require('../Models/Appointment')
const auth = require('../auth')

router.get('/',auth, async (req, res) => {
    try{
        let doctor = await Doctor.findOne({user: req.user._id})
        if(!doctor){
            let vDoctor = new Doctor({
                user: req.user._id,
            })
            await vDoctor.save()
            doctor = vDoctor
        }
        doctor = await populateDoctor(doctor)
        res.json(doctor)
    }
    catch(err){
        console.log(err)
        res.status(400).json({errors: [{msg: err.message}]})
    }
})
router.put('/',auth, async(req, res) => {
    try{
        let{specialization, dateOfBirth, contactNo} = req.body;
        let filter = {user: req.user._id}
        await Doctor.findOneAndUpdate(filter,{$set: {specialization, dateOfBirth, contactNo}})
        let doctor = await Doctor.findOne({user: req.user._id})
        doctor = await populateDoctor(doctor)
        res.json(doctor)
    }
    catch(err){
        console.log(err)
        res.status(400).json({errors: [{msg: err.message}]})
    }
})
router.get('/qualifications',auth,async(req, res) => {
    let doctor = await Doctor.findOne({user: req.user._id})
    res.json(doctor.qualifications)
})
router.post('/qualifications',auth, async(req, res) => {
    let{user,name, passingDate, passingSchool} = req.body;
    let doctor = await Doctor.findOne({user: req.user._id})
    let qualification = {
        name,
        passingDate,
        passingSchool
    }
    doctor.qualifications.unshift(qualification)
    await doctor.save()
    doctor = await populateDoctor(doctor)
    res.json(doctor.qualifications)
})

router.delete('/qualifications/:qualificationId', auth,async(req, res) => {
    let doctor = await Doctor.findOne({user: req.user._id})
    doctor.qualifications = doctor.qualifications.filter(qualification => qualification._id.toString() !== req.params.qualificationId)
    await doctor.save()
    doctor = await populateDoctor(doctor)
    res.json(doctor.qualifications)
})
router.post('/experiences',auth,async(req, res) => {
    let doctor = await Doctor.findOne({user: req.user._id})
    let{hospitalName, specialization, duration} = req.body
    let experience = {
        hospitalName,
        specialization,
        duration
    }
    doctor.experiences.unshift(experience)
    await doctor.save()
    res.json(doctor.experiences)
})
router.get('/experiences',auth,async(req, res) => {
    let doctor = await Doctor.findOne({user: req.user._id})
    res.json(doctor.experiences)
})
router.delete('/experiences/:experienceId', auth,async(req, res) => {
    let doctor = await Doctor.findOne({user: req.user._id})
    doctor.experiences = doctor.experiences.filter(experience => experience._id.toString() !== req.params.experienceId)
    await doctor.save()
    doctor = await populateDoctor(doctor)
    res.json(doctor.experiences)
})
router.get('/appointments', async(req, res) => {
    let {user} = req.body
    let doctor = await Doctor.findOne({user: req.user._id})
    let appointments = await Appointment.find({doctor: doctor._id})
    res.json(appointments)
})
router.get('/findDoctors/:specialization', async(req, res) => {
    let doctors = await Doctor.find({specialization: req.params.specialization})
    doctors = await Promise.all(doctors.map(doctor => populateDoctor(doctor)))
    res.json(doctors)
})
const populateDoctor = async(doctor) => {
    await doctor.populate({path: 'user', select: 'name email'}).execPopulate()
    return doctor;
}

module.exports = router