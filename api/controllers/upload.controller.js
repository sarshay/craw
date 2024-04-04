const { UploadImage } = require("../utils/upLoadImage");


exports.c_image_upload = async (req, res) => {
  if (req.file) {
    const filename = `${Date.now()}_${req.file.originalname.replace(" ", "")}`;
    await UploadImage(req.file, filename);
    res.json({
      filename: filename,
    });
  } else {
    console.log("no photo");
  }
};