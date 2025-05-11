const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    career: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'personas',
  }
);

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
