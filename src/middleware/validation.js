const {deleteFile} = require("../lib/helper")

exports.validation = (schema) => {
    return async (req, res, next) => {
        const {error, value} = schema.validate(req.body);
        if(!error) {
            return next();
        } else {
            if(req.files) {
                filePaths = req.files.map(e => e = e.path);
                for (const path of filePaths) {
                    await deleteFile(path);   
                }
            } else if(req.file) {
                await deleteFile(req.file.path);
            }

            return res.status(400).json({
                statusCode: 400,
                detail: error.details[0].message
            });
        }                
    }
}
