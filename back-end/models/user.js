const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    }
    
  },
  {
    collection: 'users',
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
