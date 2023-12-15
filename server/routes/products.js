import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getOnePost,
  getOwnerPost,
} from "../controller/posts.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getOnePost);
router.get("/owner/:ownerId", getOwnerPost);
router.post("/create", createPost);
router.delete("/delete/:id", deletePost);
router.put("/update/:id", updatePost);

export default router;
