const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const booksRoute = require('./routes/booksRoute.js');
const { PORT } = require('./config');

const app = express();
dotenv.config({ path: path.resolve(__dirname, './config/.env') });
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/api/books', booksRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Application connected to database');
    app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
