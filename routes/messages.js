const c = require('config')
const express = require('express')
const auth = require('../auth')
const Message = require('../Models/Message')
const router = express.Router()

router.get('/sent/:receiverId',auth, async(req,res) => {
    let messages = await Message.find({sender: req.user._id,receiver: req.params.receiverId})
    messages = await Promise.all(messages.map(message => populateMessage(message)))
    res.json(messages)
})
router.get('/received/:senderId',auth, async(req, res) => {
    let messages = await Message.find({sender: req.params.senderId,receiver: req.user._id})
    messages = await Promise.all(messages.map(message => populateMessage(message)))
    res.json(messages)
})
router.post('/:receiverId',auth, async(req, res) => {
    let{text} = req.body
    let message = new Message({
        sender: req.user._id,
        receiver: req.params.receiverId,
        text,
        time: Date.now()
    })
    await message.save()
    message = await populateMessage(message)
    res.json(message)
})
const populateMessage = async (message) => {
    await message.populate([{path: 'sender', select:'name email'},{path:'receiver', select:'name email'}]).execPopulate()
    return message
}
module.exports = router