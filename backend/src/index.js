// const express = require("express"); // for common js  syntax
import express from "express"; // for ES6 module syntax
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
  connectDB(); // Connect to the database
});
