
// controllers/posts.js
let posts = [
  { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
  { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
  { id: 3, title: "Bài viết 3", content: "Nội dung bài viết 3" },
  { id: 4, title: "Bài viết 4", content: "Nội dung bài viết 4" },
];

// GET /api/posts
export function getPosts(req, res) {
  try {
    const { search } = req.query;

    // Nếu không có bài viết nào
    if (posts.length === 0) {
      return res.status(404).json({ error: "Không có bài viết nào" });
    }

    // Nếu có search -> lọc theo tiêu đề (không phân biệt hoa thường)
    if (search) {
      const keyword = search.toLowerCase();
      const filtered = posts.filter((p) =>
        p.title.toLowerCase().includes(keyword)
      );

      return res.json(filtered); // nếu không tìm thấy thì trả [] rỗng
    }

    // Nếu không có search -> trả về tất cả
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
}

// GET /api/posts/:id
export function getPostById(req, res) {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

// POST /api/posts
export function addPost(req, res) {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// PUT /api/posts/:id
export function updatePost(req, res)  {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { title, content } = req.body;
  post.title = title || post.title;
  post.content = content || post.content;

  res.json(post);
};

// DELETE /api/posts/:id
export function deletePost (req, res) {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  posts.splice(index, 1);
  res.json({ success: true });
};
