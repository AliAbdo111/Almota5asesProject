const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const authorization =  req.headers.authorization;
    if (!authorization) {
     throw new Error('Unauthorized1')
    } else {
      const token = authorization;
      const user = await User.findOne({ token: token });
      if (!user) throw new Error("Unauthorized")
       next()  
    }
  } catch (error) {
    res.status(401)
  next(error)
  }
};
