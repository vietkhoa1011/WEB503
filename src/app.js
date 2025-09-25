import express from "express";
import morgan from "morgan";
import postRouter from "./routers/posts.js";
import userRouter from "./routers/user.js";
import productsRouter from "./routers/product.js";  

const app = express();

// Middleware log request
app.use(morgan("dev"));

// Middleware parse JSON body
app.use(express.json());

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
