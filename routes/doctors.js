const express = require('express')
const router = express.Router()
const Doctor = require('../Models/Doctor')
const Appointment = require('../Models/Appointment')

router.get('/', async (req, res) => {
    try{
        let{user} = req.body;
        let doctor = await Doctor.findOne({user: user._id})
        if(!doctor){
            let vDoctor = new Doctor({
                user: user._id,
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
router.put('/',async(req, res) => {
    try{
        let{user, department, dateOfBirth, contactNo} = req.body;
        let filter = {user: user._id}
        Doctor.findOneAndUpdate(filter,{$set: {department, dateOfBirth, contactNo}})
        let doctor = await Doctor.findOne({user: user._id})
        doctor = await populateDoctor(doctor)
        res.json(doctor)
    }
    catch(err){
        console.log(err)
        res.status(400).json({errors: [{msg: err.message}]})
    }
})
router.post('/qualifications',async(req, res) => {
    let{user,name, passingDate, passingSchool} = req.body;
    let doctor = await Doctor.findOne({user: user._id})
    let qualification = {
        name,
        passingDate,
        passingSchool
    }
    doctor.qulifications.unshift(qualification)
    await doctor.save()
    doctor = await populateDoctor(doctor)
    res.json(doctor)
})

router.get('/qulifications/:qualificationId', async(req, res) => {
    try{
        let{user} = req.body
        let doctor = await Doctor.findOne({user: user._id})
        let index = doctor.qualifications.map(qualification => qualification._id).indexOf(req.params.qualificationId)
        res.json(doctor.qualifications[index])
    }
    catch(err){
        console.log(err)
        res.status(400).json({errors: [{msg: err.message}]})
    }
})
router.put('/qulifications/:qualificationId', async(req, res) => {
    try{
        let{user,name, passingDate, passingSchool} = req.body
        let doctor = await Doctor.findOne({user: user._id})
        let index = doctor.qualifications.map(qualification => qualification._id).indexOf(req.params.qualificationId)
        doctor.qualifications[index] = {
            ...doctor.qualifications[index],
            name,
            passingDate,
            passingSchool
        }
        await doctor.save()
        res.json(doctor.qualifications[index])
    }
    catch(err){
        console.log(err)
        res.status(400).json({errors: [{msg: err.message}]})
    }
})
router.delete('/qulifications/:qualificationId', async(req, res) => {
    let{user} = req.body
    let doctor = await Doctor.findOne({user: user._id})
    doctor.qualifications = doctor.qualifications.filter(qualification => qualification._id.toString() !== req.params.qualificationId)
    await doctor.save()
    doctor = await populateDoctor(doctor)
    res.json(doctor)
})
router.get('/appointments', async(req, res) => {
    let{user} = req.body
    let doctor = await Doctor.findOne({user: user._id})
    let appointments = await Appointment.find({doctor: doctor._id})
    res.json(appointments)
})
const populateDoctor = async(doctor) => {
    await doctor.populate({path: 'user', select: 'name email'}).execPopulate()
    return doctor;
}

module.exports = router