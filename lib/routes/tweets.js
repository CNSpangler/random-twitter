// * `POST /api/v1/tweets` to create a new tweet
// * `GET /api/v1/tweets` to get all tweets
// * `GET /api/v1/tweets/:id` to get a tweet by ID
// * `PATCH /api/v1/tweets/:id` to update a tweets text **ONLY**
// * `DELETE /api/v1/tweets/:id` to delete a tweet

const { Router } = require('express');
const Tweet = require('../models/Tweet');
const getQuotes = require('../services/quotes');


module.exports = Router()
  .post('/api/v1/tweets', (req, res, next) => {
    req.body.text !== null || undefined ? req.body.text : req.body.text = getQuotes();
    Tweet
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  });

// .get('/:id', (req, res, next) => {
//   Tweet
//     .findById(req.params.id)
//     .then(playlist => res.send(playlist))
//     .catch(next);
// })

// .delete('/:id', (req, res, next) => {
//   Tweet
//     .findByIdAndDelete(req.params.id)
//     .then(playlist => res.send(playlist))
//     .catch(next);
// });
