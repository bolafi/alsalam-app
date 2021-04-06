const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect to DB
connectDB();

// Inital Middlewars
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/bookings", require("./routes/api/bookings"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
