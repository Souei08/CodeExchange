import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getOnePost,
  getOwnerPost,
  likePost,
  commentPost,
  deleteComment,
} from "../controller/posts.controller.js";

const router = express.Router();

// Post
router.get("/", getPosts);
router.get("/:id", getOnePost);
router.get("/owner/:ownerId", getOwnerPost);
router.post("/create", createPost);
router.delete("/delete/:id", deletePost);
router.put("/update/:id", updatePost);

// Comment And Like
router.post("/:postId/like", likePost);
router.post("/:postId/comments", commentPost);
router.delete("/:postId/comments/:commentId", deleteComment);

export default router;
