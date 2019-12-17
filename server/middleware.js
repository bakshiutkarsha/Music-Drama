let jwt = require('jsonwebtoken');
require('dotenv/config');
const authKey = process.env.SECRET_KEY;

//checking token for each secured api
let checkToken = (req, res, next) => {
  let token = req.headers['authorization'];
  token = token.split(' ');
  console.log(token)
  if (token[0] == "Bearer" && token[1]) {
    jwt.verify(token[1], authKey, (err, decoded) => {
      console.log(err);
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
