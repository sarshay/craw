const { safeSql } = require("../helper/connectSQL");
const moment = require("moment/moment");

const SELECT_MESSAGE = (query, cb) => {
  var limit = 12;
  var theSQL = `
  SELECT * FROM rec_message 
  `;
  var where = "WHERE 1=1 ";

  if (query?.theId) {
    var how = query?.how == "before" ? "<" : ">";
    where = where + ` AND id ${how} ${query.theId} `;
  }
  var sql = `${theSQL} ${where} ORDER BY id DESC LIMIT ${limit}`;

  console.log(sql, { query });
  safeSql(sql, [], function (err, result) {
    if (err) {
      console.log(sql, { query, err });
      cb({
        code: 500,
        message: err,
      });
    } else if (result.length == 0) {
      console.log(sql, { query });
      //   console.log(result);
      cb({
        code: 404,
        message: "Not Found",
      });
    } else {
      //   console.log(result);
      cb(null, result);
    }
  });
};

module.exports = {
  SELECT_MESSAGE,
};
