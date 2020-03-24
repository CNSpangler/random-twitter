// * `PATCH /api/v1/tweets/:id` to update a tweets text **ONLY**
// * `DELETE /api/v1/tweets/:id` to delete a tweet

const { Router } = require('express');
const Tweet = require('../models/Tweet');
const getQuotes = require('../services/quotes');


module.exports = Router()
  .post('/', async(req, res, next) => {
    if(req.body.text === null || req.body.text === undefined) {
      req.body.text = await getQuotes();
    } else req.body.text;
    Tweet
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .then(playlist => res.send(playlist))
      .catch(next);
  });

// .delete('/:id', (req, res, next) => {
//   Tweet
//     .findByIdAndDelete(req.params.id)
//     .then(playlist => res.send(playlist))
//     .catch(next);
// });
