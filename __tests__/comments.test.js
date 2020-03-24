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

  it('gets a comment by id and populates the associated tweet', async() => {
    const tweet = await Tweet.create(
      { handle: 'user', text: 'I\'m going to type every word I know.' },
    );

    const comment = await Comment.create(
      { tweetId: tweet.id, handle: 'user2', text: 'Rectangle.' }
    );

    return request(app)
      .get(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          handle: 'user2', 
          text: 'Rectangle.', 
          __v: 0, 
          tweetId: {
            _id: expect.any(String),
            handle: 'user', 
            text: 'I\'m going to type every word I know.',
            __v: 0
          }
        }
        );
      });
  });

  it('updates a comment by id', async() => {
    const tweet = await Tweet.create(
      { handle: 'user', text: 'I\'m going to type every word I know.' },
    );

    const comment = await Comment.create(
      { tweetId: tweet.id, handle: 'user2', text: 'Rectangle.' }
    );

    return request(app)
      .patch(`/api/v1/comments/${comment._id}`)
      .send({ text: 'America.' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          handle: 'user2', 
          text: 'America.',
          __v: 0, 
          tweetId: tweet.id
        });
      });
  });
  
  // * `DELETE /api/v1/comments/:id` delete a comment
  it('deletes a comment by id', async() => {
    const tweet = await Tweet.create(
      { handle: 'user', text: 'I\'m going to type every word I know.' },
    );

    const comment = await Comment.create(
      { tweetId: tweet.id, handle: 'user2', text: 'Rectangle.' }
    );

    reture request(app)
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
            tweetId: tweet.id,
            _id: expect.any(String), 
            handle: 'user2', 
            text: 'Rectangle.',
            __v: 0
        })
      })
  })
});
