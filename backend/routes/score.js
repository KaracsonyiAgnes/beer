const express = require('express');
const router = express.Router();
const Score = require('../models/Score.schema');
const beerController = require('../controllers/beer.controller');

// get all the scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find(); // it can have a limit
    res.json(scores);
  } catch (err) {
    res.json({message: err});
  }
});

// submits (posts) a score
router.post('/beer', async (req, res) => {
  const score = new Score({
    userId: req.body.score.userId,
    beerId: req.body.score.beerId,
    score: req.body.score.score,
    _id: null
  });

  try {
    score.save().then( savedScore => {
      res.json(savedScore);
    });
  } catch (err) {
    console.log(err);
    await res.json({message: err});
  }
});

// get specific score (by Id)
router.get('/:scoreId', async (req, res) => {
  try {
    const score = await Score.findById(req.params.scoreId);
    await res.json(score);
  } catch (err) {
    await res.json({message: err});
  }
});


// average score of the specific beer
router.get('/beer/:beerId', async (req, res) => {

  try {
    let average = await beerController.getAverageScoreOfBeer(req.params.beerId);

    await res.json(average);
  } catch (err) {
    console.log(err);
    await res.json({message: err});
  }
});

// delete score
router.delete('/:scoreId', async (req, res) => {
  try {
    const removedScore = await Score.remove({_id: req.params.scoreId});
    await res.json(removedScore);
  } catch (err) {
    await res.json({message: err});
  }
});

// update score
router.patch('/:scoreId', async (req, res) => {
  try {
    const updatedScore = await Score.updateOne(
      {_id: req.params.scoreId},
      {$set: {score: req.body.score}});
    await res.json(updatedScore);
  } catch (err) {
    await res.json({message: err});
  }
});

module.exports = router;
