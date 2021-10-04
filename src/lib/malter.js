const multer =  require("multer");
const path = require("path");
const {imageMaxSize} = require("../config/keys");
const util = require("util");

const fileStorage = (folderName) => {
        return multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, path.join(process.cwd(), "src", "image", folderName));
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname.split(" ").join("_") + "_" + Date.now());
            },
        });
};

exports.bannerImageUpload = util.promisify( 
    multer({ 
    storage: fileStorage("banner"),
    limits: { fileSize: imageMaxSize },
    fileFilter:(req, file, cb) => {
       if (file.mimetype === "image/png" || file.mimetype == "image/jpg" || file.mimetype === "image/jpeg") {
         cb(null, true);
       } else {
         cb(null, false);
         req.fileFormatError = "Only .png, .jpg and .jpeg format allowed!";
       }
     }  
    }).single("image")
);   



// const multipleImagesUpload = (folderName, inputName, maxCount) => {
// 	const storage = multer.diskStorage({
// 		destination: function (req, file, callback) {
// 			callback(null, path.join(process.cwd(), "src", "image", folderName));
// 		},
// 		filename: function (req, file, callback) {
// 			callback(null, file.originalname.split(" ").join("_") + Date.now());
// 		},
// 	});
// 	return multer({ storage: storage }).array(inputName, maxCount);
// };
