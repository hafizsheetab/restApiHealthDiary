const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../Models/User')

router.post('/',async (req,res) => {
  
   try{
        let {name, email, password, userType} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors:{message: 'Already Registered'}})
        }
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        
        const salt = await bcrypt.genSaltSync(10);
        password = await bcrypt.hash(password,salt)
        user = new User({
            name,
            email,
            password,
            userType,
            gravatar
        })
        await user.save()
        res.json({status: true})

   }
   catch(error){
       console.error(error.message)
       res.status(500).send('Server Error')
   }
  
})


module.exports = router