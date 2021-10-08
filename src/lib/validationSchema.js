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
    }),
    status: Joi.boolean()

});

exports.productSchema = Joi.object({
    modelId: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("model"),
        "any.required": joiValidation.anyRequired("model")
    }),
    name: Joi.string().max(100).required().messages({
        "string.base": joiValidation.stringBase("name"),
        "string.empty": joiValidation.stringEmpty("name"),
        "string.max": joiValidation.stringMax("name"),
        "any.required": joiValidation.anyRequired("name")
    }),
    currentPrice: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("current price"),
        "any.required": joiValidation.anyRequired("current price")
    }),
    weight: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("weight"),
        "any.required": joiValidation.anyRequired("weight")
    }),
    size: Joi.string().max(100).required().messages({
        "string.base": joiValidation.stringBase("size"),
        "string.empty": joiValidation.stringEmpty("size"),
        "string.max": joiValidation.stringMax("size"),
        "any.required": joiValidation.anyRequired("size")
    }),
    guarantee: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("guarantee"),
        "any.required": joiValidation.anyRequired("guarantee")
    }),
    capacity: Joi.number().required().messages({
        "number.base": joiValidation.numberBase("capacity"),
        "any.required": joiValidation.anyRequired("capacity")
    }),
    // discountPrice: Joi.number().required().messages({
    //     "number.base": joiValidation.numberBase("currentPrice"),
    //     "any.required": joiValidation.anyRequired("currentPrice")
    // }),
    detail: Joi.string().required().messages({
        "string.base": joiValidation.stringBase("detail"),
        "string.empty": joiValidation.stringEmpty("detail"),
        "any.required": joiValidation.anyRequired("detail")
    })
})

// .options({ abortEarly: false })