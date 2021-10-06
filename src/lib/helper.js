const fs = require("fs");
const util = require("util");
const path = require("path");
module.exports = {
    deleteFile: util.promisify(fs.unlink),
    imagePath: (folderName, imageName) => path.join(process.cwd(), "src", "image", folderName, imageName)
}