const getQuote = require('./quotes');

// couldn't get mock to work :(
// jest.mock('superagent', () => {
//   return {
//     get() {
//       return Promise.resolve ({
//         quote: expect.any(String)
//       });
//     }
//   };
// });
describe('get quote function', () => {
  it('gets a quote', () => {
    return getQuote()
      .then(() => {
        expect.any(String);
      });
  });
});
