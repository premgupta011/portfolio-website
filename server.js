const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/formDataDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Mongoose Schema
const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const FormData = mongoose.model("FormData", FormDataSchema);

// Handle form submission
app.post("/submit", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newEntry = new FormData({ name, email });
    await newEntry.save();
    res.status(200).send("Form submitted successfully!");
  } catch (err) {
    res.status(500).send("Error saving data.");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
