const Beer = require('../models/Beer.schema');
const Score = require('../models/Score.schema');
const categoryController = require('../controllers/category.controller');

exports.getBeerObjects = async (beers) => {
  return await Promise.all(beers.map(async beerId => Beer.findById(beerId)));
};

exports.getCategoriesOfBeerObjects = async (beer) => {
  let categoryObjects = await categoryController.getCategoryObjects(beer.categories);
  try {
    beer.categories = beer.categories.map(categoryId => categoryObjects.find(categoryObject => {
      return categoryObject._id.equals(categoryId);
    }));
  } catch (e) {
    console.log('Could not find category ID');
  }

  return beer;
};

exports.getEveryScoreFromBeer = async (beerId) => {
  let scores = await Score.find();

  try {
    scores = scores.filter(score => score.beerId.equals(beerId));
  } catch (err) {
    //await res.json({message: err});
    console.log('Could not filter scores');
  }
  return scores;
};

exports.getAverageScoreOfBeer = async (beerId) => {
  let sum = 0;
  let numberOfScores = 0;
  let average = 0;

  try {
    let scores = await this.getEveryScoreFromBeer(beerId);

    scores.map(score => {
      sum += score.score;
      numberOfScores++;
    });

    average = (sum / numberOfScores).toFixed(2);
  } catch (err) {
    console.log(err);
  }
  return average;
};

exports.sortBeersByScore = async (beers) => {
  return beers.sort((a, b) => (a.score > b.score ? -1 : 1));
};
