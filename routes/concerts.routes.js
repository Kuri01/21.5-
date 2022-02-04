const db = require('../db');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.send(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts/:id').get((req, res) => {
  const id = req.params.id;
  res.json(db.concerts.find((x) => x.id == id));
});

router.route('/concerts').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuid.v4();
  if (day && seat && client && email) {
    db.concerts.push({
      id: id,
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    res.json({ message: 'ok' });
    console.log(db.concerts);
  } else {
    res.json({ message: 'fulfill all boxes!' });
  }
});

router.route('/concerts/:id').put((req, res) => {
  const id = req.params.id;
  const { day, seat, client, email } = req.body;
  const wanted = db.concerts.find((x) => x.id == id);
  if (day && seat && client && email) {
    wanted.day = day;
    wanted.seat = seat;
    wanted.client = client;
    wanted.email = email;
    res.json({ message: 'updated!' });
  } else {
    res.send('something went wrong');
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const id = req.params.id;
  const deleted = db.concerts.find((x) => x.id == id);
  if (deleted) {
    const index = db.concerts.findIndex((item) => item.id == id);

    db.concerts.splice(index, 1);

    res.status(200).json({ message: 'ok' });
    res.status(404).json({ message: 'something went wrong' });
  } else {
    res.status(404).json({ message: 'Does not exist' });
  }
});
module.exports = router;
