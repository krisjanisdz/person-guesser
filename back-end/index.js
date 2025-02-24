const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Person  = require('./models/person');
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());

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