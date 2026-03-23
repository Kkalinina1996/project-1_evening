import { Router } from "express";
import { getDB } from "../db/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

//
//  GET /posts — получить все посты
//
router.get("/", async (req, res) => {
  try {
    const db = getDB();

    const posts = await db.collection("posts").find().toArray();

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

//
//  POST /posts — создать пост (ТОЛЬКО с токеном)
//
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content required",
    });
  }

  try {
    const db = getDB();

    const newPost = {
      title,
      content,
      author: req.user.username, // из токена
      createdAt: new Date(),
    };

    await db.collection("posts").insertOne(newPost);

    res.status(201).json({
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;