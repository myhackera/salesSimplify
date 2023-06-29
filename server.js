const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contact');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.db, {useNewUrlParser: true })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

// Routes
app.use('/contacts', contactRoutes);

// Error handling middleware
// app((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
