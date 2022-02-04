const db = require('../db');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.send(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  const id = req.params.id;
  res.json(db.testimonials.find((x) => x.id == id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = uuid.v4();
  if (author && text) {
    db.testimonials.push({ id: id, author: author, text: text });
    res.json({ message: 'ok' });
  } else {
    res.json({ message: 'fulfill all boxes!' });
  }
});

router.route('/testimonials/:id').put((req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  const wanted = db.testimonials.find((x) => x.id == id);
  if (author && text && wanted) {
    wanted.author = author;
    wanted.text = text;
    res.json({ message: 'updated!' });
  } else {
    res.send({ message: 'something went wrong' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = req.params.id;
  const deleted = db.testimonials.find((x) => x.id == id);
  if (deleted) {
    const index = db.testimonials.findIndex((item) => item.id == id);

    db.testimonials.splice(index, 1);

    res.status(200).json({ message: 'ok' });
  } else {
    res.status(404).json({ message: 'Does not exist' });
  }
});

module.exports = router;
