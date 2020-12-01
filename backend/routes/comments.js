const express = require("express");
const router = express.Router();
const CommentsCtrl = require("../controllers/comments");

router.post("/:id/like", CommentsCtrl.likeComment);

module.exports = router;