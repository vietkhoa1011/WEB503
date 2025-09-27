import express from "express";
import {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} from "../controller/posts.js";

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/", addPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
