const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  // where the files goes when uplaoded
  dest: path.resolve(__dirname, "../../tmp/uploads"),
  storage: multer.diskStorage({
    // the destination folder (like the dest above)
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "../../tmp/uploads"));
    },
    // the filename modifies the file name before saving
    // to guarantee a unique filename using a hash of the file name
    filename: function (req, file, cb) {
      crypto.randomBytes(16, (err, hash) => {
        // if error, call cb with error to be treated in the controller
        if (err) return cb(err);

        // the hash is converted to hexadecimal plus the original file name
        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        // call cb with the new file name
        cb(null, fileName);
      });
    },
  }),
  // define the file limts
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },

  // function to filter the upload of files
  // req - the request object (headers, etc)
  // file - the file object
  // cb - callback function (async function)
  filter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/pjpeg",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      // error and success
      cb(null, true);
    } else {
      // if the file is not an image, reject it
      cb(new Error("Invalid file type"));
    }
  },
};
