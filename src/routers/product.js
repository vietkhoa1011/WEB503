import express from 'express';

const productsRouter = express.Router(); 

let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 },
    { id: 3, name: 'Tablet', price: 300 }
];
productsRouter.get("/", (req, res) => {
    let result = products;
    const { maxPrice } = req.query;

    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    res.json(result);
});
productsRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res
      .status(404)
      .json({ message: "Không tìm thấy sản phẩm với ID này" });
  }

  res.json(product);
});


export default productsRouter;