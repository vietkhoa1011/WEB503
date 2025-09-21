import express from 'express';
const router = express.Router();

// Test endpoint: GET /greet
router.get('/', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).js({ message: 'Vui lòng truyền query ?name=...' });
  }
    res.json({ message: `Hello, ${name}!` });
});

export default router;