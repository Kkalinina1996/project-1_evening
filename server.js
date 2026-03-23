import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

import authRoutes from "./routes/auth.js";


dotenv.config();

const app = express();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3333;

app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is working ");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${HOST}:${PORT}`);
});
  })
  .catch((error) => {
    console.error("Failed to start server", error);
  });