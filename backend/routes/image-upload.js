const express = require("express");
const router = express.Router();
const ImageUploadController = require("../controllers/image-upload");

router.post("/image-upload", ImageUploadController.imageUpload);

module.exports = router;
