const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

exports.UploadImage = async (image, filename) => {
  const sizes = [
    { name: "s", size: 100 },
    { name: "m", size: 500 },
    // { name: "l", size: 1200 },
  ];
  const uploadDir = process.env.APP_PHOTO_PATH;
  sizes.map((size) => {
    if (!fs.existsSync(`${uploadDir}/${size.name}`)) {
      fs.mkdirSync(`${uploadDir}/${size.name}`, { recursive: true });
    }
  });
  console.log(process.cwd());
  sizes.map(async (s) => {
    await sharp(image.buffer)
      .resize(s.size)
      .toFile(
        path.resolve(`./${process.env.APP_PHOTO_PATH}/${s.name}/${filename}`)
      );
  });
};
