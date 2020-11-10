const express = require("express");
const router = express.Router();
const PostsCtrl = require("../controllers/posts");
const AuthMiddleware = require("../middlewares/authMiddleware");

router.post("/createPost", PostsCtrl.createPost);
router.get("/filter", PostsCtrl.filterPosts);
router.get("/all", AuthMiddleware.authMiddleware, PostsCtrl.getAllPosts);
router.get("/filtered", PostsCtrl.getFilteredPosts);
router.get("/search", PostsCtrl.searchPosts);
router.get("", PostsCtrl.getPublicPosts);
router.post("/:id/like", PostsCtrl.likePost);
router.post("/:id/comment", PostsCtrl.commentPost);
router.get("/:id", PostsCtrl.getPostDetails);

module.exports = router;
