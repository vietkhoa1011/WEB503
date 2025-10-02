import Post from "../models/post.js";

// GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const { search } = req.query;

    // nếu có search -> lọc theo title
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // không phân biệt hoa thường
    }

    const posts = await Post.find(query);

    if (posts.length === 0) {
      return res.status(404).json({ message: "Không có bài viết nào" });
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
};

// GET /api/posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: "ID không hợp lệ", details: error.message });
  }
};

// POST /api/posts
export const addPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Không tìm thấy bài viết để cập nhật" });
    }

    return res.status(200).json({
      message: "Cập nhật thành công",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Không tìm thấy bài viết để xoá" });
    }

    res.json({ message: "Xoá thành công", data: deletedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
