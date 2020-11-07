const express = require("express");
const router = express.Router();
const PostsCtrl = require("../controllers/posts");
const AuthMiddleware = require("../middlewares/authMiddleware");

router.post("/createPost", PostsCtrl.createPost);
router.get("", PostsCtrl.getPublicPosts);
router.get("/all", AuthMiddleware.authMiddleware, PostsCtrl.getAllPosts);
router.get("/filtered", PostsCtrl.getFilteredPosts);
router.post("/:id/like", PostsCtrl.likePost);
router.post("/:id/comment", PostsCtrl.commentPost);
router.get("/:id", PostsCtrl.getPostDetails);

module.exports = router;