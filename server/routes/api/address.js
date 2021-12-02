const router = require("express").Router();
const model = require("../../models/address");
const { addressUpload } = require("../../middleware/upload");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { addressMsg } = require("../../config/message");
const {deleteFile, imagePath} = require("../../lib/helper");
const { protect } = require("../../middleware/protect");

router.get("/", async (req, res) => {
    try {
        const address = await model.getAddress();
        res.status(200).json({
            statusCode: 200,
            data: address
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: addressMsg.requestErr
        });
    }

});

router.get("/all", protect, async (req, res) => {
    try {
        const addresses = await model.getAllAddresses();
        res.status(200).json({
            statusCode: 200,
            results: addresses.length,
            data: addresses
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: addressMsg.requestErr
        });
    }

});

router.get("/:id", protect, async (req, res) => {
    try {
        const addressId = req.params.id * 1;
        const address = await model.getAddressById(addressId);
        res.status(200).json({
            statusCode: 200,
            data: address 
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: addressMsg.requestErr
        });
    }

});

router.post("/", protect, addressUpload, validation(schema.addressSchema), async (req, res) => {
    try {
        let imageNames = req.files.map(e => e = e.filename);
        imageNames = JSON.stringify(imageNames);
        const {id} = await model.addAddress(req.body, imageNames); 
        if(req.body.active === "false") {
            await model.disableAddress(id);
        }
        
        res.status(201).json({
            statusCode: 201,
            message: addressMsg.successAdd
        });
     
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: addressMsg.requestErr
        });    
    }
});

router.patch("/:id", protect, addressUpload, validation(schema.addressSchema), async (req, res) => {
    try {
        const addressId = req.params.id * 1;
        let addressImages = await model.getAddressImages(addressId);
        addressImages = JSON.parse(addressImages.images);
        for (const image of addressImages) {
            await deleteFile(imagePath("address", image));   
        }
        let imageNames = req.files.map(e => e = e.filename);
        imageNames = JSON.stringify(imageNames);
        await model.updateAddress(req.body, imageNames, addressId);

        if(req.body.active === "false") {
            await model.disableAddress(addressId); 
        }
            
        res.status(201).json({
            statusCode: 201,
            message: addressMsg.successEdit
        });
     
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: addressMsg.requestErr
        });    
    }
});

router.patch("/active/:id", protect, async (req, res) => {
    try {
        const addressId = req.params.id * 1;
        if(req.body.active) {
            await model.activeAddress(addressId);
            res.status(200).json({
                statusCode: 200,
                message: addressMsg.successActive,
            });
        } else {
            await model.disableAddress(addressId);
            res.status(200).json({
                statusCode: 200,
                message: addressMsg.successDisable,
            });
        }
        
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: addressMsg.requestErr
        });    
    }
});

router.patch("/delete/:id", protect, async (req, res) => {
    try {
        const addressId = req.params.id * 1;
        await model.deleteAddress(addressId);

        res.status(200).json({
            statusCode: 200,
            message: addressMsg.successDelete,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: addressMsg.requestErr
        });    
    }
});

module.exports = router;