// * `PATCH /api/v1/tweets/:id` to update a tweets text **ONLY**

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
  })

  .patch('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(tweet => res.send(tweet));
  })

  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(playlist => res.send(playlist))
      .catch(next);
  });
