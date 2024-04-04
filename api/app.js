require("dotenv").config();
var express = require("express");
var cors = require("cors");
var app = new express();
const socketSetup = require("./socketSetup");

const http = require("http");

const server = http.createServer(app);
const io = socketSetup(server);

module.exports = io;

var path = require("path");
const bodyParser = require("body-parser");
const { userInfo } = require("./middleware/index.middleware.js");

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/storage/photos`, express.static(process.env.APP_PHOTO_PATH));
app.use(function (req, res, next) {
  // console.log(req);
  console.log(` ${req.ip} => ${req.method}  - ${req.url}`);
  console.log(req.query);
  setTimeout(() => {
    next();
  }, 0);
});

app.use("/api/auth", [userInfo], require("./routes/auth.route.js"));
app.use("/api", [userInfo], require("./routes/index.route.js"));
app.use("/webhook", require("./routes/webhook.route.js"));
app.use("/messaging-webhook", require("./routes/messaging-webhook.route.js"));


app.use(express.static(path.join(__dirname, "./www")));

app.use(function (req, res) {
  res.status(404).json({
    title: "Page Not Found",
    description: "this is Page Not Faund page",
    payload: req.body,
  });
});

// app.use(function (err, req, res) {
//   console.log({ err, req });
// });

server.listen(process.env.APP_PORT, () => {
  console.log(`listening on *:${process.env.APP_PORT}`);
});
