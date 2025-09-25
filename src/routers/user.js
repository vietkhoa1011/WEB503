import express from 'express';

const userRouter = express.Router(); // 👈 khởi tạo Router
// Test endpoint: GET /products
userRouter.get('/', (req, res) => {
  res.send('user'); // 👈 trả về chữ "products"
});
export default userRouter;