var express = require("express");
var router = express.Router();
const { needAuth } = require("../middleware/index.middleware.js");

const { c_image_upload } = require("../controllers/upload.controller.js");

const multer = require("multer");
const { c_home } = require("../controllers/home.controller.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", c_home);

router.post(
  "/upload_photo",
  [needAuth, upload.single("image")],
  c_image_upload
);

module.exports = router;
