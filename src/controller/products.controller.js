import Product from "../models/product.models.js";


export const getProducts = async (req, res) => {
  try {
    let { _page = 1, _limit = 10, name, minPrice, maxPrice } = req.query;

    _page = parseInt(_page) || 1;
    _limit = parseInt(_limit) || 10;

    // Tạo bộ lọc query
    const filter = {};

    // Tìm kiếm theo tên (không phân biệt hoa thường)
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // Lọc theo khoảng giá
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Đếm tổng số sản phẩm phù hợp
    const total = await Product.countDocuments(filter);

    // Truy vấn có phân trang
    const products = await Product.find(filter)
      .skip((_page - 1) * _limit)
      .limit(_limit);

    res.status(200).json({
      data: products,
      pagination: {
        _page,
        _limit,
        total,
        totalPages: Math.ceil(total / _limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách sản phẩm", details: err.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy sản phẩm", details: err.message });
  }
};


export const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Thiếu thông tin sản phẩm" });
    }

    const newProduct = new Product({ name, price });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm", details: err.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm để cập nhật" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật sản phẩm", details: err.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm để xóa" });
    }

    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa sản phẩm", details: err.message });
  }
};
