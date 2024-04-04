var mysql = require("mysql2");
var pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.theSql = (sql, cb) => {
  pool.query(sql, function (err, result) {
    cb(err, result);
  });
};

exports.safeSql = (sql, data, cb) => {
  pool.query(sql, data, function (err, result) {
    cb(err, result);
  });
};
