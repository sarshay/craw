const { safeSql } = require("../helper/connectSQL");
const { logger } = require("../log/logger");

function SELECT_USER_BY_EMAIL({ email }, cb) {
  var sql = `SELECT * FROM ls_user WHERE email = ?`;
  safeSql(sql, [email], function (err, result) {
    if (err) {
      cb({
        code: 500,
        message: err,
      });
    } else if (result.length == 0) {
      cb({
        code: 404,
        message: "no content",
      });
    } else {
      cb(null, result[0]);
    }
  });
}

function SELECT_USER_BY_EMAIL_PASSWORD({ email, password }, cb) {
  var sql = `SELECT * FROM ls_user WHERE email = ? and password = ?`;
  safeSql(sql, [email, password], function (err, result) {
    if (err) {
      cb({
        code: 500,
        message: err,
      });
    } else if (result.length == 0) {
      cb({
        code: 404,
        message: "no content",
      });
    } else {
      cb(null, result[0]);
    }
  });
}

function SELECT_USER_BY_ID({ id }, cb) {
  var sql = `SELECT * FROM ls_user WHERE id = ?`;
  safeSql(sql, [id], function (err, result) {
    if (err) {
      cb({
        code: 500,
        message: err,
      });
    } else if (result.length == 0) {
      cb({
        code: 404,
        message: "no content",
      });
    } else {
      cb(null, result[0]);
    }
  });
}

function CREATE_USER(data, cb) {
  var sql = `INSERT INTO ls_user SET ? `;
  safeSql(sql, data, function (err, result) {
    if (err) {
      logger.error(err);
      cb({
        code: 500,
        message: err,
      });
    } else {
      SELECT_USER_BY_ID({ id: result.insertId }, (err, result) => {
        cb(err, result);
      });
    }
  });
}

// Export the functions
module.exports = {
  SELECT_USER_BY_EMAIL_PASSWORD,
  SELECT_USER_BY_EMAIL,
  SELECT_USER_BY_ID,
  CREATE_USER,
};
