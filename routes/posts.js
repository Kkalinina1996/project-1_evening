import { Router } from "express";

const router = Router();

import { getDB } from "../db/index.js";

router.get("/", async (req, res) => {
  const db = getDB();

  const posts = await db.collection("posts").find().toArray();

  res.json(posts);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;

  const db = getDB();

  await db.collection("posts").insertOne({
    title,
    content,
    createdAt: new Date(),
  });

  res.json({ message: "Post created" });
});

export default router;

