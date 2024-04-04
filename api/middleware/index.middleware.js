const { SELECT_BY_ID } = require("../models/master.model");
const { SELECT_USER_BY_ID } = require("../models/user.model");
const { verifyToken } = require("../utils/security");

exports.userInfo = (req, res, next) => {
  var token = req.header("authorization")
    ? req.header("authorization").replace("Bearer ", "")
    : false;
  req.token = token;
  // console.log({ token });
  if (token) {
    verifyToken(token, (err, data) => {
      if (err) {
        next();
      } else {
        req.deToken = data;
        SELECT_USER_BY_ID({ id: data.data.id }, (err, result) => {
          if (err) {
            next();
          } else {
            req.user = result;
            next();
          }
        });
      }
    });
  } else {
    next();
  }
};
exports.needAuth = (req, res, next) => {
  // console.log({user:req.user})
  if (req.user) {
    next();
  } else {
    res.status(401).json("Unauthorized");
  }
};
