const express = require('express')
const router = express.Router()
const auth = require('../auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../Models/User')

router.get('/',auth, async(req,res) => {
    let user = await User.findById(req.user.user.id).select("-password");
    if(!user){
        return res.status(400).json({msg: 'userNotFound'})
    }
    res.send(user)

})
router.post('/',async (req,res) => {
   try{
        let {email, password} = req.body
        let user = await User.findOne({email}).select()
        if(!user){
            return res.status(400).json({errors:{message: 'Invalid Credentials'}})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors:{message: 'Invalid Credentials'}})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,process.env.JWT_KEY,{expiresIn:360000},(err,token) =>{
            if(err) throw err
            res.json({token})
        })
        

   }
   catch(error){
       console.error(error)
       res.status(500).send('Server Error')
   }
  
})

module.exports = router