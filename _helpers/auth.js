const jwt = require("jsonwebtoken");
const userService = require("../users/user.service");

const checkToken = async (req, res, next) => {
  try {
    if (req.session.payload) {
      const response = await jwt.verify(
        req.session.payload,
        req.sessionID,
        (err, result) => {
          if (err) {
            throw err;
          }
          return result;
        }
      );
      const user = await userService.getById(response.sub);
      if (user) {
        next();
      } else {
        res.sendStatus(403);
      }
    }
    else {
        res.send('Please login!')
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = checkToken;
