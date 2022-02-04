const express = require('express');
const app = express();
const port = 8000;
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', testimonialsRoutes);
app.use('/', concertsRoutes);
app.use('/', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: '404 not found...' });
});

app.listen(port, () => {
  console.log('running!');
});
