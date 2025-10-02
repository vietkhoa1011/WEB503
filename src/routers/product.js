import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controller/products.controller.js";
 const productsRouter = express.Router();
productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.post("/", addProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);
export default productsRouter;