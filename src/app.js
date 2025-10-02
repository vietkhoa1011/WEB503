import express from "express";
import morgan from "morgan";
import postRouter from "./routers/posts.js";
import userRouter from "./routers/user.js";
import productsRouter from "./routers/product.js";  
import mongoose from "mongoose";

const app = express();

// Middleware log request
app.use(morgan("dev"));

// Middleware parse JSON body

  app.use(express.json());
  mongoose.connect(`mongodb://127.0.0.1:27017/web503_nodejs`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Dùng router

app.get("/", (req, res) => {
  res.send("Hello, chào các bạn: ");
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);


// Khởi động server
app.listen(3000, () => {
  console.log("🚀 Server is running at http://localhost:3000");
});
