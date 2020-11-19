const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
     
    // Get the token header
    const token = req.header('x-auth-token')

    // Check for token
    if (!token) {
        res.status(401).json({ message: 'No token, invalid permission' })
    }

    // Validate token
    try {
        
        const encryption = jwt.verify(token, process.env.SECRET)
        req.user = encryption.user
        next()

    } catch (error) {
        res.status(401).json({ message: 'Token not valid' })
    }
}