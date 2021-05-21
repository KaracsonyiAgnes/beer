const express = require('express');
const router = express.Router();
const Category = require('../models/Category.schema');

// get all the categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find(); // it can have a limit
    res.json(categories);
  } catch (err) {
    res.json({message: err});
  }
});

// submits (posts) a category
router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const savedCategory = await category.save();
    await res.json(savedCategory)
  } catch (err) {
    await res.json({message: err});
  }
});

// specific category (by Id)
router.get('/:categoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    await res.json(category);
  } catch (err) {
    await res.json({message: err});
  }
});

// delete category
router.delete('/:categoryId', async (req, res) => {
  try {
    const removedCategory = await Category.remove({_id: req.params.categoryId});
    await res.json(removedCategory);
  } catch (err) {
    await res.json({message: err});
  }
});

// update category
router.patch('/:categoryId', async (req, res) => {
  try {
    const updatedCategory = await Category.updateOne(
      {_id: req.params.categoryId},
      {$set: {title: req.body.title}});
    await res.json(updatedCategory);
  } catch (err) {
    await res.json({message: err});
  }
});

module.exports = router;
