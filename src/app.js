import express from "express";
import dotenv from "dotenv";
import postRouter from "./routers/post.js";
import productsRouter from './routers/products .js';
import userRouter from './routers/user.js';
import sumRouter from "./routers/sum.js";
import greetRouter from "./routers/greet.js";

    dotenv.config();
    const app = express();
    const port = process.env.PORT || 3000;

app.use("/api/post", postRouter);
app.use('/api/products', productsRouter);
app.use('/api/user', userRouter);
app.use("/api/sum", sumRouter);
app.use("/api/greet", greetRouter);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});