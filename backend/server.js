const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* ---------- ROUTES ---------- */
app.use("/api/ml", require("./routes/mlRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

/* ---------- MONGODB CONNECTION ---------- */
console.log("Mongo URI:", process.env.MONGO_URI);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI not set in .env (backend/.env)");
  process.exit(1);
}

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      // mongoose v7+ uses sensible defaults; keep serverSelectionTimeoutMS to fail fast
      serverSelectionTimeoutMS: 5000
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message || err);
    if (err.message && err.message.includes("Authentication failed")) {
      console.error("→ Auth failed: check DB user + password in MONGO_URI");
    } else if (err.message && err.message.includes("ENOTFOUND")) {
      console.error("→ Host not found: check hostname in MONGO_URI and DNS");
    } else if (err.message && err.message.includes("ECONNREFUSED")) {
      console.error("→ Connection refused: is MongoDB running at that host/port?");
    }
    process.exit(1);
  }
}

start();
