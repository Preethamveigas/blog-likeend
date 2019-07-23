const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');

// Handle routes
const posts = require('./routes/api/posts');

const app = express();
module.exports = app;
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(cors());

//PORT TO RUN
const PORT = process.env.PORT || 3001;

// Db config
const db = require('./config/keys').mongoURI;

// Mongoose db connect
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('Database up and running'))
  .catch(err => console.log('Database connection failed', err));

// handle users route
app.use('/api/posts', posts);

//@router test
app.get('/backend-like', (req, res) => {
  var s = process.env.an_env_var || '';
  if (s == '') {
    res.status(404);
    res.end();
  } else {
    res.status(200).json({
      greet: 'hello'
    });
  }
});

app.listen(PORT, () => {
  console.log('Server is running at port http://localhost:' + PORT);
});
