const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Person  = require('./models/person');
const User  = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());

// JWT secret key
const secretKey = 'this_is_a_secret';

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.get('/api/people/random', async (req, res) => {
    try {
      const count = await Person.countDocuments();
      const randomIndex = Math.floor(Math.random() * count);
      const randomPerson = await Person.find().skip(randomIndex).limit(1);
      res.json(randomPerson[0]);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching random person' });
    }
});

app.post('/login', async (req, res) => {
  try {
    const { user_or_email, password } = req.body;

    let user;
    if (user_or_email.includes('@')) {
      user = await User.findOne({ email: user_or_email });
    } else {
      user = await User.findOne({ username: user_or_email });
    }

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    console.log(`User found: ${user.username || user.email}`);

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.json({ token, message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error posting login info' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password, passwordAgain } = req.body;
    const username_exist = await User.findOne({ username });
    const email_exist = await User.findOne({ email });


    if(username === '' || email === '' || password === ''){
      return res.status(400).json({ message: 'Aizpildiet obligātos laukus!' });
    }
    if(password !== passwordAgain){
      return res.status(400).json({ message: 'Paroles nesakrīt' });
    }
    if (username_exist) return res.status(400).json({ message: 'Lietotājvārds jau pastāv!' });
    if (email_exist) return res.status(400).json({ message: 'Epasts jau pastāv!' });
    if(!email.includes('@')){
      return res.status(400).json({ message: 'Ievadiet korektu e-pasta adresi!' });
    }
    if(username.includes('@')){
      return res.status(400).json({ message: 'Lietotājvārdā nedrīkst būt simbols @' });
    }
    

    const passwordHash = await bcrypt.hash(password, 11);
    const newUser = new User({username, email, password: passwordHash, isAdmin: false});
    console.log(newUser);

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, secretKey);
    res.status(201).json({ message: 'New user created', success: true, token });

  } catch (err) {
    res.status(500).json({ error: 'Error posting register info', error:err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


/*
const testPeople = [
    {
      name: 'Raimonds',
      surname : 'Pauls',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Raimonds_Pauls_2012.jpg/250px-Raimonds_Pauls_2012.jpg',
      description: 'A famous Latvian composer and pianist, known for his contribution to Latvian and Soviet-era music.',
    },
    {
      name: 'Kristaps',
      surname : 'Porziņģis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kristaps_Porzingis.jpg/250px-Kristaps_Porzingis.jpg',
      description: 'A professional Latvian basketball player who has played in the NBA for teams like the New York Knicks and Boston Celtics.',
    },
    {
      name: 'Rainis',
      surname : '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Rainis.jpg/250px-Rainis.jpg',
      description: 'A legendary Latvian poet, playwright, and politician, considered one of the most influential figures in Latvian literature.',
    }
  ];
  

  const seedDatabase = async () => {
    try {
      await Person.deleteMany(); // Clear existing data
      await Person.insertMany(testPeople);
      console.log('Test data inserted successfully!');
    } catch (err) {
      console.error('Error inserting test data:', err);
    }
  };
  
  seedDatabase();
  */


  const testUsers = [
    {
      username: "antons123",
      email: "antons123@gmail.com",
      password: "12345"
    },
    {
      username: "peters5",
      email: "peters5@gmail.com",
      password: "0000"
    },
  ]

const deleteDatabaseUsers = async () => {   // delete all users
  try {
    await User.deleteMany(); // Clear existing data
    console.log('Test data deleted successfully!');
  } catch (err) {
    console.error('Error deleted test data:', err);
  }
};

const seedDatabaseWithUsers = async () => { // add all users
  try {
    await User.insertMany(testUsers);
    console.log('Test data deleted successfully!');
  } catch (err) {
    console.error('Error inserting test data:', err);
  }
};

//deleteDatabaseUsers();
//seedDatabaseWithUsers();