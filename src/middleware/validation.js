const { upload } = require("../lib/malter");
const { bannerMsg } = require("../config/message");
const { modelSchema } = require("../lib/validationSchema");

exports.bannerValidation = (req, res, next) => {
    return upload("banner").single("image")(req, res, err => {
        if (err) {
            if(err.code === "LIMIT_FILE_SIZE") {
             return res.status(400).json({
                    statusCode: 400,
                    detail: bannerMsg.fileSizeErr
                })
            }
            return res.status(400).json({
                statusCode: 400,
                detail: err.message
            });
        } else {
            if (req.fileFormatError) {
                return res.status(400).json({
                    statusCode: 400,
                    detail: req.fileFormatError
                });
            } else if (!req.file) {
                return res.status(400).json({
                    statusCode: 400,
                    detail: bannerMsg.imageEmptyErr
                });
            } else {
                const {error, value} = bannerSchema.validate(req.body);
                    
                if(!error) {
                    return next();
                } else {
                    return res.status(400).json({
                        statusCode: 400,
                        detail: error.details[0].message
                    });
                }
                
            } 
        }
    });
}

exports.statisticsValidation = (req, res, next) => {
    const {error, value} = statisticsSchema.validate(req.body);
    if(!error) {
        return next();
    } else {
        return res.status(400).json({
            statusCode: 400,
            detail: error.details[0].message
        });
    }                
                
}

exports.modelValidation = (req, res, next) => {
    const {error, value} = modelSchema.validate(req.body);
    if(!error) {
        return next();
    } else {
        return res.status(400).json({
            statusCode: 400,
            detail: error.details[0].message
        });
    }                
                
}