const jwt = require('jsonwebtoken')

const generateToken = (key) => {
    return jwt.sign({key}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}
module.exports = generateToken;