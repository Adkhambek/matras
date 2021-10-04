const Joi = require("joi");

exports.bannerSchema = Joi.object({
    title: Joi.string().max(100).required().messages({
        "string.base": "title should be a type of text",
        "string.empty": "title cannot be an empty field",
        "string.max": "title should have a maximum length of {#limit}",
        "any.required": "title is a required field"
    })
});

// .options({ abortEarly: false })