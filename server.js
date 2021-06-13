const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const path = require("path");

// Connect to DB
connectDB();

// Inital Middlewars
app.use(cors());
app.use(express.json({ extended: false }));
app.use(cookieParser());

// Sanitize Data
app.use(mongoSanitize());

// Set Security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Prevent xss attacks
app.use(xss());

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/bookings", require("./routes/api/bookings"));

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
