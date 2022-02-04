const db = require('../db');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  res.send(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats/:id').get((req, res) => {
  const id = req.params.id;
  res.json(db.seats.find((x) => x.id == id));
});

router.route('/seats').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuid.v4();
  if (performer && genre && price && day && image) {
    db.seats.push({
      id: id,
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    res.json({ message: 'ok' });
    console.log(db.seats);
  } else {
    res.json({ message: 'fulfill all boxes!' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const id = req.params.id;
  const { performer, genre, price, day, image } = req.body;
  const wanted = db.seats.find((x) => x.id == id);
  if (performer && genre && price && day && image) {
    wanted.performer = performer;
    wanted.genre = genre;
    wanted.price = price;
    wanted.day = day;
    wanted.image = image;

    res.json({ message: 'updated!' });
  } else {
    res.send('something went wrong');
  }
});

router.route('/seats/:id').delete((req, res) => {
  const id = req.params.id;
  const deleted = db.seats.find((x) => x.id == id);
  console.log(deleted);
  if (deleted) {
    const index = db.seats.findIndex((item) => item.id == id);

    db.seats.splice(index, 1);

    res.status(200).json({ message: 'ok' });
    res.status(404).json({ message: 'something went wrong' });
  } else {
    res.status(404).json({ message: 'Does not exist' });
  }
});

module.exports = router;
