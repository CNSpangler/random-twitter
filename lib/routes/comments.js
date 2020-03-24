const { Router } = require('express');
const Tweet = require('../models/Tweet');
const Comment = require('../models/Comment');

module.exports = Router()

  .post('/', async(req, res, next) => {
    Comment
      .create(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })

  .get('/:id', async(req, res, next) => {
    Comment
      .findById(req.params.id)
      .populate('tweetId')
      .then(comment => res.send(comment))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Comment
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(comment => res.send(comment))
      .catch(next);
  });

// .post('/', async(req, res, next) => {
//   if(req.body.text === null || req.body.text === undefined) {
//     req.body.text = await getQuotes();
//   } else req.body.text;
//   Tweet
//     .create(req.body)
//     .then(tweet => res.send(tweet))
//     .catch(next);
// })

// .get('/', (req, res, next) => {
//   Tweet
//     .find()
//     .then(tweets => res.send(tweets))
//     .catch(next);
// })

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
