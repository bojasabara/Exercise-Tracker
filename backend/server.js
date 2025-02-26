const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello to Fitness Tracker API");
});

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = app;
