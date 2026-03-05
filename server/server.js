const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/trades", require("./routes/tradeRoutes"));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
