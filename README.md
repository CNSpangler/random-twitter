# Random Tweet (Worth 10 points. If it actually tweets 20 pts)

Create an API that deals with tweets. A tweet schema looks like

```js
const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
```

## Routes

* `POST /api/v1/tweets` to create a new tweet
* `GET /api/v1/tweets` to get all tweets
* `GET /api/v1/tweets/:id` to get a tweet by ID
* `PATCH /api/v1/tweets/:id` to update a tweets text **ONLY**
* `DELETE /api/v1/tweets/:id` to delete a tweet

## Randomness

Update your model so if the text is empty you fetch a random quote from
an API (e.g. the futurama API) and use that as text. Use mongoose
middleware for this.

{ handle: 'ryan' } -> { handle: 'ryan', text: 'RANDOM QUOTE FROM API' }

## Comments

Add a comments model that references a tweet.

### Comment Routes

* `POST /api/v1/comments` create a comment
* `GET /api/v1/comments/:id` get a comment by id and populate tweet
* `PATCH /api/v1/comments/:id` update a comment
* `DELETE /api/v1/comments/:id` delete a comment

### Update tweet routes

* `GET /api/v1/tweets/:id` to get a tweet by ID and all comments
  on the tweet

## Resources

* [Ron Swanson](https://ron-swanson-quotes.herokuapp.com/v2/quotes)
* [Futurama](http://futuramaapi.herokuapp.com/)
* [The Simpsons](https://thesimpsonsquoteapi.glitch.me/)

## Testing

Only do end to end testing (testing routes). No need to model test.

## Setup

* `npm init alchemy-be random-twitter`
* go to github create a repo
  * make it public
  * no readme
* copy the `git remote add origin YOUR_URL_HERE` line
* back on terminal `cd random-twitter`
* paste `git remote add origin YOUR_URL_HERE`
* `git add .`
* `git commit -m 'init'`
* `git push origin master`
* `git checkout -b dev`
* CODE! or plan :) (or die)

## Rubric

* tweet model - 0.5 point
* comment model - 0.5 point
* tweet routes - 4 points
* comment routes - 4 points
* random tweet middleware - 1 point
