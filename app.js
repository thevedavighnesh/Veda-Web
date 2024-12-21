const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Simulated user database
const users = {
  user1: 'password123',
  admin: 'adminpassword',
};

// Simulated video data
const videos = [
  { title: 'Venky - Movie Scene', filename: 'Edit.mp4', poster: 'Edit.jpg', description: 'A recreation of Venky - The Movie.', genre: 'Drama', category: 'Comedy Scenes' },
  { title: 'ME - The Movie', filename: 'ME.mp4', poster: 'ME.jpg', description: 'A thriller that puts you on the edge of your seat.', genre: 'Thriller', category: 'Short Films' },
  { title: 'Attharintiki Daaredi', filename: 'Edit2.mp4', poster: 'Edit2.jpg', description: 'A recreation of Ahalya Amaikuralu.', genre: 'Comedy', category: 'Comedy Scenes' },
  { title: 'Knock Knock...', filename: 'KnockKnock.mp4', poster: 'KK.jpg', description: 'A Horror Story that gives you chills.', genre: 'Horror', category: 'Short Films' },
];

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'auth', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'auth', 'signup.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    res.json({ success: true, redirectTo: '/index.html' });
  } else {
    res.json({ success: false, message: 'Invalid username or password.' });
  }
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.json({ success: false, message: 'Username already exists.' });
  }
  users[username] = password;
  res.json({ success: true, message: 'Signup successful!', redirectTo: '/login' });
});

app.get('/videos', (req, res) => res.json(videos));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
