const express = require("express");
const router = express.Router();
const ImageUploadController = require("../controllers/image-upload");

router.post("/upload", ImageUploadController.imageUpload);
router.post("/upload-alternative", ImageUploadController.imageUploadBusboy);

module.exports = router;
