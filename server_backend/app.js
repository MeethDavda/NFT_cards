const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connection URL and database name
const url = 'mongodb://localhost:27017/';
const dbName = 'userDB';
mongoose.connect(url + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
console.log('Connected to MongoDB');
})
.catch((err) => {
console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Create the User model
const User = new mongoose.model('User', userSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set the 'views' directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login page
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/home', (req, res) => {
    res.render('home'); // Render the home.ejs template
});

// Authenticate the user
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if the credentials match in the database
    User.findOne({ username: username, password: password }).exec()
    .then((user) => {
      if (user) {
        // Authentication successful
        console.log('Authentication successful');
        res.redirect('/home'); // Redirect to the home page
      } else {
        // Authentication failed
        console.log('Authentication failed');
        res.send({ success: false });
      }
    })
    .catch((err) => {
      console.error('Error querying MongoDB:', err);
      res.send({ success: false });
    });
});

app.post('/logout', (req, res) => {
    res.redirect('/login'); // Redirect the user back to the login page
});

// Start the server and open the login page
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
