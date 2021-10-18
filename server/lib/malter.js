const multer =  require("multer");
const path = require("path");
const {imageMaxSize} = require("../config/keys");

exports.upload = (folderName) => {
        const fileStorage =  multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, path.join(process.cwd(), "src", "image", folderName));
            },
            filename: function (req, file, callback) {
                callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
            },
        });
        return multer({ 
            storage: fileStorage,
            limits: { fileSize: imageMaxSize },
            fileFilter:(req, file, cb) => {
               if (file.mimetype === "image/png" || file.mimetype == "image/jpg" || file.mimetype === "image/jpeg") {
                 cb(null, true);
               } else {
                 cb(null, false);
                 req.fileFormatError = "Only .png, .jpg and .jpeg format allowed!";
               }
             }  
        });  
};





