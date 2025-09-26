require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({message:"Unauthorized request please provide JWT token",success:false});
          }
          // const token = req.headers["authorization"].split(" ")[1];
        const tokenWithBearer = req.headers.authorization;
        const tokenArray = tokenWithBearer.split(' ');
        const token = tokenArray[1];
        if (!token) {
            return res.status(401).send({message:"Access denied. No token provided.",success:false});
          }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userData = decoded;
        next();
    }
    catch (err) {
        res.status(401).send({ success: false, message: 'Un-Authorized User Request' })
    }
}