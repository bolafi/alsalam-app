const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to DB
connectDB();

// Inital Middlewars
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
