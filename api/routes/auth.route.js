var express = require("express");
var router = express.Router();
const { SCHEMA } = require("../constants/schema.js");
const {
  CREATE_USER,
  SELECT_USER_BY_EMAIL,
  SELECT_USER_BY_EMAIL_PASSWORD,
} = require("../models/user.model.js");
const {
  generateToken,
  tokenExpiresIn,
  decodeToken,
  encryptPassword,
} = require("../utils/security.js");
const { makeUp } = require("../utils/makeup.js");
const { UPDATE } = require("../models/master.model.js");
//////////
// auth //
//////////
router.post("/signin", (req, res) => {
  var { credential, username, password } = req.body;
  if (credential) {
    var u = decodeToken(credential);
    if (u.email) {
      SELECT_USER_BY_EMAIL({ email: u.email }, (err, result) => {
        if (err) {
          var user = {
            name: u.name,
            email: u.email,
            img_url: u.picture,
          };
          CREATE_USER(user, (err, result) => {
            if (err) {
              res.status(500).json("user create err");
            } else {
              var token = generateToken(
                makeUp(result, ["id", "name", "email"])
              );
              result.token = token;
              result.exp = tokenExpiresIn;
              res.json(
                makeUp(result, [...SCHEMA.READ.USER, "token", "exp"], true)
              );
            }
          });
        } else {
          var token = generateToken(makeUp(result, ["id", "name", "email"]));
          result.token = token;
          result.exp = tokenExpiresIn;
          res.json(makeUp(result, [...SCHEMA.READ.USER, "token", "exp"], true));
        }
      });
    } else {
      res.status(403).json("invalid credential");
    }
  } else if (username && password) {
    password = encryptPassword(password);
    console.log(password)
    SELECT_USER_BY_EMAIL_PASSWORD(
      { email: username, password: password },
      (err, result) => {
        if (err) {
          res.status(403).json("invalid username or password");
        } else {
          var token = generateToken(makeUp(result, ["id", "name", "email"]));
          result.token = token;
          result.exp = tokenExpiresIn;
          res.json(makeUp(result, [...SCHEMA.READ.USER, "token", "exp"], true));
        }
      }
    );
  } else {
    res.status(400).json({ error: "invalid credential", payload: req.body });
  }
});

router.post("/newPassword", (req, res) => {
  const { password } = req.body;
  if (req.user && password) {
    UPDATE(
      "ls_user",
      { id: req.user.id, password: encryptPassword(password) },
      (err, result) => {
        if (err) {
          res.status(500).json("not updated");
        } else {
          res.json(makeUp(result, SCHEMA.READ.USER, true));
        }
      }
    );
  } else {
    res.status(403).json("no auth");
  }
});
// me
router.get("/me", (req, res) => {
  if (req.user) {
    res.json(makeUp(req.user, SCHEMA.READ.USER, true));
  } else {
    res.status(403).json("no auth");
  }
}); // me
module.exports = router;
