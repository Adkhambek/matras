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
        successActive: "The model was active successfully!",
        successDelete: "The model was deleted successfully!",
        requestErr: "Your request could not be processed. Please try it again"       
    },
    productMsg: {
        successAdd: "The product was added successfully!",
        successEdit: "The product was updated successfully!",
        successDisable: "The product was disabled successfully!",
        successActive: "The product was active successfully!",
        successDelete: "The product was deleted successfully!",
        requestErr: "Your request could not be processed. Please try it again" 
    },
    technologyMsg: {
        successAdd: "The technology was added successfully!",
        successEdit: "The technology was updated successfully!",
        successDisable: "The technology was disabled successfully!",
        successActive: "The technology was active successfully!",
        successDelete: "The technology was deleted successfully!",
        fileSizeErr: `File size cannot be larger than ${imageMaxSize}!`,
        imageEmptyErr: "Image is required!",
        limitErr: "You can only add up to 3 data!",
        requestErr: "Your request could not be processed. Please try it again"
    },
    addressMsg: {
        successAdd: "The address was added successfully!",
        successEdit: "The address was updated successfully!",
        successDisable: "The address was disabled successfully!",
        successActive: "The address was active successfully!",
        successDelete: "The address was deleted successfully!",
        fileSizeErr: `File size cannot be larger than ${imageMaxSize}!`,
        imageEmptyErr: "Image is required!",
        limitErr: "You can only add up to 3 image!",
        requestErr: "Your request could not be processed. Please try it again"
    },
    interestMsg: {
        successAccept: "Arizangiz muvaffaqiyatli qabul qilindi ✅", 
        connect: "Siz bilan tez orada bog’lanamiz 😊",
        phoneErr: "Raqamni xato kiritdingiz. Iltimos, qaytadan to'g'irlab kiriting!",
        phoneEmptyErr: "Raqamni kiritmadingiz!",
        checked: "The interest was checked successfully!",
        unchecked: "The interest was unchecked",
        successDelete: "The interest was deleted successfully!",
        invalidPage: "Invalid page number",
        notFound: "Nothing found",
        requestErr: "Your request could not be processed. Please try it again"
    },
    orderMsg: {
        successAccept: "Arizangiz muvaffaqiyatli yuborildi", 
        connect: "Tez orada operatorlarimiz siz bilan bog’lanishadi",
        phoneErr: "Raqamni xato kiritdingiz. Iltimos, qaytadan to'g'irlab kiriting!",
        phoneEmptyErr: "Raqamni kiritmadingiz!",
        letterLimit: "20 tagacha harf kirita olasiz",
        checked: "The order was checked successfully!",
        emptyField: "Ba'zi ma'lumot kiritmagansiz!",
        unchecked: "The order was unchecked",
        invalidPage: "Invalid page number",
        notFound: "Nothing found",
        requestErr: "Your request could not be processed. Please try it again"
    },
    authMsg: {
        successLogin: "Successful logged in",
        notLogin: "You are not logged in! Please log in to get access.",
        notExist: "The user belonging to this token does no longer exist.",
        invalidToken: "Invalid token. Please, log in again!",
        tokenExpired: "Your token has expired. Please, log in again!",
        changePassword: "User recently changed password! Please log in again.",
        incorrectLogin: "username or password is incorrect. Please, try one more time.",
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