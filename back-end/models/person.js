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
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'personas',
  }
);

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
