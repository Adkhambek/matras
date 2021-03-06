const Joi = require("joi");
const { joiValidation, interestMsg, orderMsg } = require("../config/message")

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
    active: Joi.boolean().required()

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
    discountPrice: Joi.number().messages({
        "number.base": joiValidation.numberBase("currentPrice")
    }),
    detail: Joi.string().required().messages({
        "string.base": joiValidation.stringBase("detail"),
        "string.empty": joiValidation.stringEmpty("detail"),
        "any.required": joiValidation.anyRequired("detail")
    }),
    active: Joi.boolean().required(),
    discount: Joi.boolean().required(),
    navinla: Joi.boolean().required(),
});

exports.technologySchema = Joi.object({
    name: Joi.string().max(30).required().messages({
        "string.base": joiValidation.stringBase("name"),
        "string.empty": joiValidation.stringEmpty("name"),
        "string.max": joiValidation.stringMax("name"),
        "any.required": joiValidation.anyRequired("name")
    }), 
    video: Joi.string().max(200).required().messages({
        "string.base": joiValidation.stringBase("youtube link"),
        "string.empty": joiValidation.stringEmpty("youtube link"),
        "string.max": joiValidation.stringMax("youtube link"),
        "any.required": joiValidation.anyRequired("youtube link")
    }), 
    detail: Joi.string().max(600).required().messages({
        "string.base": joiValidation.stringBase("youtube link"),
        "string.empty": joiValidation.stringEmpty("youtube link"),
        "string.max": joiValidation.stringMax("youtube link"),
        "any.required": joiValidation.anyRequired("youtube link")
    }),
    active: Joi.boolean().required() 
});

exports.addressSchema = Joi.object({
    address: Joi.string().max(50).required().messages({
        "string.base": joiValidation.stringBase("address"),
        "string.empty": joiValidation.stringEmpty("address"),
        "string.max": joiValidation.stringMax("address"),
        "any.required": joiValidation.anyRequired("address")
    }),
    target: Joi.string().max(100).required().messages({
        "string.base": joiValidation.stringBase("target"),
        "string.empty": joiValidation.stringEmpty("target"),
        "string.max": joiValidation.stringMax("target"),
        "any.required": joiValidation.anyRequired("target")
    }),
    location: Joi.string().required().messages({
        "string.base": joiValidation.stringBase("location"),
        "string.empty": joiValidation.stringEmpty("location"),
        "any.required": joiValidation.anyRequired("location")
    }),
    active: Joi.boolean().required()
});

exports.interestSchema = Joi.object({
    phone: Joi.string().required().max(9).pattern(/^[0-9]+$/).messages({
        "string.empty": interestMsg.phoneEmptyErr,
        "any.required": interestMsg.phoneEmptyErr,
        "string.pattern.base": interestMsg.phoneErr,
        "string.max": interestMsg.phoneErr 
    })
});

exports.orderSchema = Joi.object({
    name: Joi.string().required().max(20).messages({
        "string.empty": orderMsg.emptyField,
        "any.required": orderMsg.emptyField,
        "string.max": orderMsg.letterLimit
    }),
    phone: Joi.string().required().max(9).pattern(/^[0-9]+$/).messages({
        "string.empty": orderMsg.emptyField,
        "any.required": orderMsg.emptyField,
        "string.pattern.base": orderMsg.phoneErr,
        "string.max": orderMsg.phoneErr 
    }),
    productId: Joi.number().messages({
        "number.base": joiValidation.numberBase("productId"),
        "any.required": joiValidation.anyRequired("productId")
    }),
    amount: Joi.number().messages({
        "number.base": joiValidation.numberBase("amount"),
        "any.required": joiValidation.anyRequired("amount")
    })
});

exports.loginSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.base": joiValidation.stringBase("username"),
        "string.empty": joiValidation.stringEmpty("username"),
        "any.required": joiValidation.anyRequired("username")  
    }),
    password: Joi.string().required().messages({
        "string.base": joiValidation.stringBase("password"),
        "string.empty": joiValidation.stringEmpty("password"),
        "any.required": joiValidation.anyRequired("password")  
    })
})

// .options({ abortEarly: false })