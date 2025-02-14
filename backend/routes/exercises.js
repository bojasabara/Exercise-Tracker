const router = require('express').Router();
const Exercise = require('../models/exercise.model');

// Get all exercises
router.route('/').get(async (req, res) => {
  try {
    const exercises = await Exercise.find();
    console.log('Fetched exercises:', exercises); // Debug log
    res.json(exercises);
  } catch (err) {
    console.error('Error fetching exercises:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Add new exercise
router.route('/add').post(async (req, res) => {
  try {
    const { username, description, duration, date } = req.body;
    console.log('Received exercise data:', req.body); // Debug log

    const newExercise = new Exercise({
      username,
      description,
      duration: Number(duration),
      date: Date.parse(date)
    });

    const savedExercise = await newExercise.save();
    console.log('Saved exercise:', savedExercise); // Debug log
    res.json('Exercise added!');
  } catch (err) {
    console.error('Error adding exercise:', err);
    res.status(400).json('Error: ' + err);
  }
});

// Delete exercise
router.route('/:id').delete(async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json('Exercise deleted.');
  } catch (err) {
    console.error('Error deleting exercise:', err);
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;