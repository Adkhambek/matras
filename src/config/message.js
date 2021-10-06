let { imageMaxSize } = require("./keys")
imageMaxSize = imageMaxSize.toString()[0] + "MB";

module.exports = {
    bannerMsg: {
        successAdd: "The banner was added successfully!",
        successEdit: "The banner was updated successfully!",
        successDisable: "The banner was disabled successfully!",
        fileSizeErr: `File size cannot be larger than ${imageMaxSize}!`,
        imageEmptyErr: "Image is required!",
        requestErr: "Your request could not be processed. Please try it again"
    },
    statisticsMsg: {
        successEdit: "The statistics was updated successfully!",
        requestErr: "Your request could not be processed. Please try it again"
    },
    joiValidation: {
            stringBase: (nameField) => `${nameField} should be a type of text`,
            stringEmpty: (nameField) => `${nameField} cannot be an empty field`,
            stringMax: (nameField) => `${nameField} should have a maximum length of {#limit}`,
            anyRequired: (nameField) => `${nameField} is a required field`,
            numberBase: (nameField) => `${nameField} should be a type of number`,
            numberEmpty: (nameField) => `${nameField} cannot be an empty field`,
    }
}