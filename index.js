const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000; // You can change this port if needed

// Connect to MongoDB
mongoose.connect(
  "mongodb://mhemanthkmr:Hemanth123$@mongodb.selfmade.ninja:27017/users",
  {
    dbName: "mhemanthkmr_users",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

//Cors Options
const corsOptions = {
  exposedHeaders: "x-auth-token",
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
