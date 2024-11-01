const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user"); // Assuming you have user routes
const assignmentRoutes = require('./routes/assignment');

// Load environment variables
dotenv.config();

// Create an express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/assignments", assignmentRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
