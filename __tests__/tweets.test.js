require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');
// const getQuotes = require('../lib/services/quotes');

// jest.mock('../lib/services/lyrics.js', () => {
//   return () => Promise.resolve('some fake lyrics');
// });

// jest.mock('../lib/services/search.js', () => {
//   return () => Promise.resolve([...Array(100)]
//     .map((_, i) => ({ artist: `Artist ${i}`, title: `Title ${i}` })));
// });

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

  it('creates a new tweet with user text', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: 'someone',
        text: 'People who buy things are suckers.'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'someone',
          text: 'People who buy things are suckers.',
          __v: 0
        });
      });
  });

  it('creates a new tweet with random quote from API', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({
        handle: 'someone',
        text: ''
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'someone',
          text: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all tweets', async() => {
    const tweets = await Tweet.create([
      { handle: 'user', text: 'rectangle' },
      { handle: 'user', text: 'America' },
      { handle: 'user', text: 'butthole' },
    ]);

    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        tweets.forEach(tweet => {
          expect(res.body).toContainEqual({
            _id: tweet._id.toString(),
            handle: tweet.handle,
            text: tweet.text
          });
        });
      });
  });


//   it('gets all playlist seeds', () => {
//     return PlaylistSeed.create({
//       songs: [
//         { artist: 'test artist', title: 'test title' },
//         { artist: 'test artist2', title: 'test title2' },
//         { artist: 'test artist1', title: 'test title1' },
//       ]
//     })
//       .then(() => {
//         return request(app)
//           .get('/api/v1/playlist-seeds');
//       })
//       .then(res => {
//         expect(res.body).toEqual([
//           {
//             _id: expect.any(String),
//             songs: [
//               { _id: expect.any(String), artist: 'test artist', title: 'test title' },
//               { _id: expect.any(String), artist: 'test artist2', title: 'test title2' },
//               { _id: expect.any(String), artist: 'test artist1', title: 'test title1' },
//             ],
//             __v: 0
//           }
//         ]);
//       });
//   });
});
