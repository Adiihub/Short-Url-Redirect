const jwt = require('jsonwebtoken'); //now users ke liye token bnayenge
const SECRET_KEY = "aditi#123";


function setUser(user) {
     jwt.sign({
        _id: user._id,
        email: user.email
    }, SECRET_KEY)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, SECRET_KEY);
}


module.exports = {
    setUser,
    getUser,
}