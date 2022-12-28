const path = require("path");
const multer = require("multer");
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFillter: (req, file, cd) => {
    if (file.mimetype === "image/jpeg") {
      cd(null, true);
    } else {
      cd(new Error("please uplaod jpg file"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
