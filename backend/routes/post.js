const express = require("express");
const router = express.Router();
const PostsCtrl = require("../controllers/posts");

router.post("/createPost", PostsCtrl.createPost);
router.get("", PostsCtrl.getAllPosts);
router.get("/filtered", PostsCtrl.getFilteredPosts);
router.get("/:id", PostsCtrl.getPostDetails);


module.exports = router;
