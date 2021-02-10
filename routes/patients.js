const express = require('express')
const auth = require('../auth')
const Patient = require('../Models/Patient')
const router = express.Router()

router.get('/',auth, async(req, res) => {
    let patient = await Patient.findOne({user: req.user._id})
    if(!patient){
        console.log(req.user._id)
        vPatient = new Patient({user: req.user._id})
        await vPatient.save()
        patient = vPatient
    }
    patient = await populatePatient(patient)
    res.json(patient)
})

router.put('/',auth, async(req, res) => {
    
    let{height, weight, contactNo, age, dateOfBirth, gender, nid, bloodgroup} = req.body
    let filter = {user: req.user._id}
    await Patient.findOneAndUpdate(filter, {$set: {height, weight, contactNo, age, dateOfBirth, gender, nid, bloodgroup}})
    let patient = await Patient.findOne({user: req.user._id})
    patient = await populatePatient(patient)
    res.json(patient)
})
router.get('/getProfile/:userId',auth, async(req, res) => {
    let patient = await Patient.findOne({user: req.params.userId})
    patient = await populatePatient(patient)
    res.json(patient)
})
const populatePatient = async (patient) => {
    await patient.populate({path: 'user', select: 'name email'}).execPopulate()
    return patient;
}

module.exports = router