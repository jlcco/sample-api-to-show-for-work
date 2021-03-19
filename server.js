const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

//Top middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// MongoDB Config and Listener
const MONGO_URI = "mongodb+srv://jlcco:jlcco1234@cluster0.0krgn.mongodb.net/sample-api-blog-posts?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(console.log('Connected to MongoDB'))
  .then(
    app.listen(port, () => {
      console.log(`Server is online at port ${port}`);
  }))
  .catch(err => console.log(`Error: ${err}`));

mongoose.set('useFindAndModify', false);

//test:
app.get('/', (req, res, next) => {
  res.send('Hello from localhost');
  next();
});

//Log in:
app.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then((loggedInUser, err) => {
      if (err) {
        res.send(`Err: ${err}`);
      }

      if (loggedInUser) {
        res.send("Successful Log-in");
      }

      if (!loggedInUser) {
        res.send("The email and password did not match our records. Please double check and try again");
      }
    });
});

//Sign up
app.post('/signup', (req, res) => {
  const {body} = req;

  console.log(body);

  const newUser = new User({
    username: body.username,
    email: body.email,
    password: body.password,
    birthDate: body.birthDate,
    phoneNumber: body.phoneNumber
  });

  newUser
    .save()
    .then((newUser, err) => { 
      if (err){
        res.send(`Error: ${err}`);
        return false;
      } else {
        res.send(`Successfully added: ${newUser}`);
        return true;
      }
    });
});

// Routes Config
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

// Routes Config
const postRoutes = require('./routes/postRoutes');
app.use('/post', postRoutes);