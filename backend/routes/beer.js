const express = require('express');
const router = express.Router();
const Beer = require('../models/Beer.schema');
const beerController = require('../controllers/beer.controller');

// get all the beers
router.get('/', async (req, res) => {
  try {
    let beers = await Beer.find().limit(20);
/*    const updatedBeer = await Beer.updateOne(
      {name: 'Snow Cap'},
      {$set: {image: 'Snow-Cap.jpg'}});*/
    beers = await Promise.all(beers.map(async beer => {
      beer = await beerController.getCategoriesOfBeerObjects(beer);
      let score = await beerController.getAverageScoreOfBeer(beer._id);
      beer = beer.toAuthJSON(score);
      return beer;
    }));
    let sortedBeers = await beerController.sortBeersByScore(beers);

    res.json(sortedBeers);
  } catch (err) {
    res.json({message: err});
  }
});

// submits (posts) a beer
router.post('/', async (req, res) => {
  const beer = new Beer({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    categories: req.body.categories,
  });
  try {
    const savedBeer = await beer.save();
    await res.json(savedBeer)
  } catch (err) {
    await res.json({message: err});
  }
});

// specific beer
router.get('/:beerId', async (req, res) => {
  try {
    let beer = await Beer.findById(req.params.beerId);
    beer = await beerController.getCategoriesOfBeerObjects(beer);

    await res.json(beer);
  } catch (err) {
    await res.json({message: err});
  }
});

// array of specific beers by Ids
router.post('/recommendedBeers', async (req, res) => {
  const beerArray = req.body.beers;
  let beers = [];

  try {
    await Promise.all(beerArray.map(async beerId => {
      if (beerId != null) {
        let beer = await Beer.findOne({csvId: beerId});
        beer = await beerController.getCategoriesOfBeerObjects(beer);
        beers.push(beer);
      }
    }));

    await res.json(beers);
  } catch (err) {
    await res.json({message: 'Cannot find beers with given ids'});
  }
});

// delete beer
router.delete('/:beerId', async (req, res) => {
  try {
    const removedBeer = await Beer.remove({_id: req.params.beerId});
    await res.json(removedBeer);
  } catch (err) {
    await res.json({message: err});
  }
});

// update beer
router.patch('/:beerId', async (req, res) => {
  try {
    const updatedBeer = await Beer.updateOne(
      {_id: req.params.beerId},
      {$set: {title: req.body.title}});
    await res.json(updatedBeer);
  } catch (err) {
    await res.json({message: err});
  }
});

// every beer from the specific category
router.post('/category', async (req, res) => {
  try {
    let beers = await Beer.find({categories: req.body.categoryId}).limit(10).populate('categories');
    res.json(beers);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
