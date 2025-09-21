import express from "express";

const postRouter = express.Router(); // 👈 khởi tạo Router

// Test endpoint: GET /post
postRouter.get("/", (req, res) => {
  res.send("post"); // 👈 trả về chữ "post"
});

export default postRouter;
