const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Person  = require('./models/person');
const User  = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

app.get('/api/guess', async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const parts = name.trim().split(' ');

  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');

  try {
    const person = await Person.findOne({
      name: new RegExp('^' + firstName + '$', 'i'),
      surname: new RegExp('^' + lastName + '$', 'i')
    });

    if (!person) return res.status(404).json({ error: 'Personība nav atrasta' });

    res.json(person);
  } catch (err) {
    console.error('Error fetching person:', err);
    res.status(500).json({ error: 'Error fetching person' });
  }
});


app.get('/api/people/search', async (req, res) => {
  const term = req.query.term;
  if (!term) return res.json([]);

  try {
    const regex = new RegExp(term, 'i');
    const people = await Person.find({
      $or: [
        { name: regex },
        { surname: regex },
        { $expr: { $regexMatch: { input: { $concat: ['$name', ' ', '$surname'] }, regex: regex } } }
      ]
    }).limit(10);
    
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: 'Search error' });
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

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, secretKey);
    res.json({
      token,
      isAdmin: user.isAdmin,
      username: user.username,
      email: user.email,
      message: 'Login successful'
    });


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

app.post('/api/change-password', async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Trūkst lauku vai autentifikācijas tokena!' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Paroles nesakrīt!' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Lietotājs nav atrasts!' });
    }

    // Check if new password matches the old one
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'Jaunā parole nedrīkst būt tāda pati kā vecā!' });
    }

    // Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, 11);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Parole veiksmīgi nomainīta!', success: true });

  } catch (err) {
    console.error('Change password error:', err);
    res.status(401).json({ message: 'Nederīgs token vai cita kļūda.' });
  }
});

app.post('/api/delete-account', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Trūkst autentifikācijas tokena!' });
    }

    // verify jwt and get user id
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    // delete user from db
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Lietotājs nav atrasts vai jau dzēsts.' });
    }

    res.json({ message: 'Lietotāja konts veiksmīgi dzēsts.', success: true });

  } catch (err) {
    console.error('Dzēšanas kļūda:', err);
    res.status(401).json({ message: 'Nederīgs token vai cita kļūda.' });
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
      gender: 'Vīrietis',
      career: 'Mūziķis',
      region: 'Vidzeme',
      birthYear: '1943',
    },
    {
      name: 'Kristaps',
      surname : 'Porziņģis',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kristaps_Porzingis.jpg/250px-Kristaps_Porzingis.jpg',
      gender: 'Vīrietis',
      career: 'Sportists',
      region: 'Kurzeme',
      birthYear: '1995',
    },
    {
      name: 'Rainis',
      surname : '',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Rainis.jpg/250px-Rainis.jpg',
      gender: 'Vīrietis',
      career: 'Dzejnieks',
      region: 'Vidzeme',
      birthYear: '1865',
    },
    {
      name: 'Aminata',
      surname: 'Savadogo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Aminata_Savadogo_2015.jpg/440px-Aminata_Savadogo_2015.jpg',
      gender: 'Sieviete',
      career: 'Mūziķis',
      region: 'Vidzeme',
      birthYear: 1993,
    },
    {
      name: 'Dāvis',
      surname: 'Bertāns',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Davis_Bertans_2021.jpg/440px-Davis_Bertans_2021.jpg',
      gender: 'Vīrietis',
      career: 'Sportists',
      region: 'Vidzeme',
      birthYear: 1992,
    }  
  ];
  
*/
  const seedDatabase = async () => {
    try {
      await Person.deleteMany(); // Clear existing data
      await Person.insertMany(testPeople);
      console.log('Test data inserted successfully!');
    } catch (err) {
      console.error('Error inserting test data:', err);
    }
  };
  
  //seedDatabase();
  
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