const Joi = require("joi");
const { joiValidation } = require("../config/message")

exports.bannerSchema = Joi.object({
    title: Joi.string().max(100).required().messages({
        "string.base": joiValidation.stringBase("title"),
        "string.empty": joiValidation.stringEmpty("title"),
        "string.max": joiValidation.stringMax("title"),
        "any.required": joiValidation.anyRequired("title")
    })
});

exports.statisticsSchema = Joi.object({
    experience: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("experience"),
        "any.required": joiValidation.anyRequired("experience")
    }),
    client: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("client"),
        "any.required": joiValidation.anyRequired("client")
    }), 
    guarantee: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("guarantee"),
        "any.required": joiValidation.anyRequired("guarantee")
    }), 
    delivery: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("delivery"),
        "any.required": joiValidation.anyRequired("delivery")
    })
});

exports.modelSchema = Joi.object({
    name: Joi.string().max(20).required().messages({
        "string.base": joiValidation.stringBase("name"),
        "string.empty": joiValidation.stringEmpty("name"),
        "string.max": joiValidation.stringMax("name"),
        "any.required": joiValidation.anyRequired("name")
    })
});

// .options({ abortEarly: false })