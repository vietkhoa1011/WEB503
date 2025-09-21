import express from "express";
const router = express.Router();

// GET /api/sum?a=3&b=5
router.get("/", (req, res) => {
  const { a, b } = req.query;

  if (!a || !b || isNaN(Number(a)) || isNaN(Number(b))) {
    return res.status(400).json({ message: "Vui lòng truyền a và b là số" });
  }

  const sum = Number(a) + Number(b);
  res.json({ sum });
});

export default router;
