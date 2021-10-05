let { imageMaxSize } = require("./keys")
imageMaxSize = imageMaxSize.toString()[0] + "MB";

module.exports = {
    bannerMsg: {
        successAdd: "The banner was added successfully!",
        successEdit: "The banner was updated successfully!",
        fileSizeErr: `File size cannot be larger than ${imageMaxSize}!`,
        imageEmptyErr: "Image is required!",
        requestErr: "Your request could not be processed. Please try it again"
    }
}