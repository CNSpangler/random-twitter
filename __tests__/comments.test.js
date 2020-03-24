// * `GET /api/v1/comments/:id` get a comment by id and populate tweet
// * `PATCH /api/v1/comments/:id` update a comment
// * `DELETE /api/v1/comments/:id` delete a comment

require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');
const Comment = require('../lib/models/Comment');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a comment', async() => {
    const tweet = await Tweet.create(
      { handle: 'user', text: 'I\'m going to type every word I know.' },
    );

    return request(app)
      .post('/api/v1/comments')
      .send({
        tweetId: tweet.id,
        handle: 'user2',
        text: 'rectangle'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: tweet.id,
          handle: 'user2',
          text: 'rectangle',
          __v: 0
        });
      });
  });

  // * `GET /api/v1/comments/:id` get a comment by id and populate tweet
  it('gets a comment by id and populates the associated tweet', async() => {
    const tweet = await Tweet.create(
      { handle: 'user', text: 'I\'m going to type every word I know.' },
    );

    const comment = await Comment.create(
      { tweetId: tweet.id, handle: 'user2', text: 'Rectangle.' }
    );

    comment.populate(tweet);

    return request(app)
      .get('/api/v1/comments/:id')
      .then(res => {
        expect(res.body).toEqual({
          tweet: {
            _id: expect.any(String),
            tweetId: tweet.id,
            handle: 'user2',
            text: 'rectangle',
            __v: 0
          },
          comment: { tweetId: tweet.id, handle: 'user2', text: 'Rectangle.' }
        });
      });
  });


  // it('creates a new tweet with random quote from API', () => {
  //   return request(app)
  //     .post('/api/v1/tweets')
  //     .send({
  //       handle: 'someone',
  //       text: ''
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         handle: 'someone',
  //         text: expect.any(String),
  //         __v: 0
  //       });
  //     });
  // });

  // it('gets all tweets', async() => {
  //   const tweets = await Tweet.create([
  //     { handle: 'user', text: 'rectangle' },
  //     { handle: 'user', text: 'America' },
  //     { handle: 'user', text: 'butthole' },
  //   ]);

  //   return request(app)
  //     .get('/api/v1/tweets')
  //     .then(res => {
  //       tweets.forEach(tweet => {
  //         expect(res.body).toContainEqual({
  //           _id: tweet._id.toString(),
  //           handle: tweet.handle,
  //           text: tweet.text,
  //           __v: 0
  //         });
  //       });
  //     });
  // });

  // it('gets a tweet by id', async() => {
  //   const tweet = await Tweet.create(
  //     { handle: 'user', text: 'rectangle' },
  //   );

  //   return request(app)
  //     .get(`/api/v1/tweets/${tweet._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         handle: 'user', 
  //         text: 'rectangle',
  //         __v: 0
  //       });
  //     });
  // });

  // it('updates a tweet by id', async() => {
  //   const tweet = await Tweet.create(
  //     { handle: 'user', text: 'rectangle' },
  //   );

  //   return request(app)
  //     .patch(`/api/v1/tweets/${tweet._id}`)
  //     .send({ text: 'America' })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         handle: 'user',
  //         text: 'America',
  //         __v: 0
  //       });
  //     });
  // });

  // it('deletes a tweet by id', async() => {
  //   const tweet = await Tweet.create(
  //     { handle: 'user', text: 'rectangle' },
  //   );
  //   return request(app)
  //     .delete(`/api/v1/tweets/${tweet._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         handle: 'user', 
  //         text: 'rectangle',
  //         __v: 0
  //       });
  //     });
  // });
});
