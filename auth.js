const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')

    if(!token){
        return res.status(401).json({error: 'No Token Sent'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded.user
        next()

    }
    catch(err){
        res.status(401).json({msg: 'invalid Token'})
    }


}