const mongoose = require('mongoose');

const BeerSchema = mongoose.Schema({
  csvId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  categories: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
      }
    ],
  }
});

// Duplicate the ID field.
BeerSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
BeerSchema.set('toJSON', {
  virtuals: true
});


BeerSchema.methods.toAuthJSON = function (score) {
  return {
    id: this.id,
    csvId: this.csvId,
    name: this.name,
    description: this.description,
    image: this.image,
    categories: this.categories,
    score: score
  };
};

module.exports = mongoose.model('beer', BeerSchema);
