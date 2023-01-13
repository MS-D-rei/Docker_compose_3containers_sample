const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Goal = require("./models/goal");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origins", [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
  ]);
  res.setHeader("Access-Control-Allow-Methods", [
    "GET",
    "POST",
    "PUT",
    "DELETE",
  ]);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/goals", async (req, res) => {
  console.log("Trying to fetch goals");
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log("Fetched goals");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to load goals." });
  }
});

app.post("/goals", async (req, res) => {
  console.log("Trying to store goal");
  const goalText = req.body.text;
  if (!goalText || goalText.trim().length === 0) {
    console.log("Invalid input - No Text");
    return res.status(422).json({ message: "Invalid goal text" });
  }
  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: "Ooal saved", goal: { id: goal.id, text: goalText } });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to save goal" });
  }
});

app.delete("/goals/:id", async (req, res) => {
  console.log("Trying to delete goal");
  try {
    await Goal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted goal" });
    console.log("Deleted the goal");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to delete goal" });
  }
});

mongoose.set("strictQuery", false);

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB");
      app.listen(80);
    }
  }
);
