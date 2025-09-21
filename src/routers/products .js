import express from 'express';

const productsRouter = express.Router(); // 👈 khởi tạo Router

// Test endpoint: GET /products
productsRouter.get('/', (req, res) => {
  res.send('products'); // 👈 trả về chữ "products"
});

export default productsRouter;