let jwt = require('jsonwebtoken');
const authKey = process.env.SECRET_KEY;


let checkToken = (req, res, next) => {
  let token = req.headers['authorization'];
  token = token.split(' ');

  if (token[0] != "Bearer" && token[1]) {
    jwt.verify(token[1], authKey, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}
