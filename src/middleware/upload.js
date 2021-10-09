const { upload } = require("../lib/malter");
const { bannerMsg, technologyMsg } = require("../config/message");
const {countBanners} = require("../models/banner");
const {countTechnologies} = require("../models/technology");

exports.bannerUpload = async (req, res, next) => {
    let countBanner = await countBanners();
    countBanner = countBanner.count * 1
    if(countBanner < 4 || req.method === "PATCH") {
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
                    return next();
                } 
            }
        });                   
    } else {
       return res.status(400).json({
            statusCode: 400,
            error: bannerMsg.limitErr
        });   
    }          
    
}

exports.productUpload = (req, res, next) => {
    return upload("product").array("images", 4)(req, res, err => {
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
            } else if (!req.files.length) {
                return res.status(400).json({
                    statusCode: 400,
                    detail: bannerMsg.imageEmptyErr
                });
            } else {
                return next();
            } 
        }
    });
}

exports.technologyUpload = async (req, res, next) => {
    let countTechnology = await countTechnologies();
    countTechnology = countTechnology.count * 1
    if(countTechnology < 3 || req.method === "PATCH") {
        return upload("technology").single("image")(req, res, err => {
            if (err) {
                if(err.code === "LIMIT_FILE_SIZE") {
                 return res.status(400).json({
                        statusCode: 400,
                        detail: technologyMsg.fileSizeErr
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
                        detail: technologyMsg.imageEmptyErr
                    });
                } else {
                    return next();
                } 
            }
        });                   
    } else {
       return res.status(400).json({
            statusCode: 400,
            error: technologyMsg.limitErr
        });   
    } 
}