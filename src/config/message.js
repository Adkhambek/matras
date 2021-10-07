let { imageMaxSize } = require("./keys")
imageMaxSize = imageMaxSize.toString()[0] + "MB";

module.exports = {
    bannerMsg: {
        successAdd: "The banner was added successfully!",
        successEdit: "The banner was updated successfully!",
        successDisable: "The banner was disabled successfully!",
        successDelete: "The banner was deleted successfully!",
        fileSizeErr: `File size cannot be larger than ${imageMaxSize}!`,
        imageEmptyErr: "Image is required!",
        limitErr: "You can only add up to 4 data!",
        requestErr: "Your request could not be processed. Please try it again"
    },
    statisticsMsg: {
        successEdit: "The statistics was updated successfully!",
        requestErr: "Your request could not be processed. Please try it again"
    },
    modelMsg: {
        successAdd: "The model was added successfully!",
        successEdit: "The model was updated successfully!",
        successDisable: "The model was disabled successfully!",
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