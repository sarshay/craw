var md5 = require("md5");
var jwt = require("jsonwebtoken");
var secret = "helol";
exports.tokenExpiresIn = 30 * 24 * 60 * 60;
exports.generateToken = (data) => {
  return jwt.sign(
    {
      data: data,
    },
    secret,
    { expiresIn: this.tokenExpiresIn }
  );
};

//jwt.verify(token, secretOrPublicKey, [options, callback]

exports.verifyToken = (token, cb) => {
  // let token = req.headers["x-access-token"];
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      cb(err);
    } else {
      cb(null, decode);
    }
  });
};
exports.decodeToken = (token)=>{
  return jwt.decode(token)
}
exports.encryptPassword = (password) => {
  return md5(md5(password) + "madin");
};
