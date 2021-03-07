const jwt_decode = require('jwt-decode')

module.exports = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split("Bearer ")[1];
      } else {
        console.error("No token found");
        return res.status(403).json({ error: "Unauthorized" });
      }
    
    let decoded = await jwt_decode(token)
    req.user = decoded.profile
    next()
    

}