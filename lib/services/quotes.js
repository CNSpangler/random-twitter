// write a function that gets a random quote from an API
const request = require ('superagent');

module.exports = () => {
  return request
    .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.body)
    .then(({ quote }) => quote);
};
