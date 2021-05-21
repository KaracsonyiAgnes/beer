const Category = require('../models/Category.schema');

exports.getCategoryObjects = async (categories) => {
  return await Promise.all(categories.map(async categoryId => Category.findById(categoryId)));
};
