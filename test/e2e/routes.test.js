const request = require('supertest');
const { expect } = require('chai');

const app = require('../../server');

describe('Routes', () => {
  const jsonNotPalindromeMessage = { message: 'Word is not a palindrome' };
  const entryNotValidMessage = { message: 'Entry is not valid' };
  
  let sortedTopFiveScores;

  beforeEach(() => {
    sortedTopFiveScores = [
      {name: 'Charles', points: 15},
      {name: 'Bob', points: 6},
      {name: 'Aneel', points: 5},
      {name: 'Fiona', points: 5},
      {name: 'Eva', points: 4},
    ];
  });

  describe('GET /', () => {
    it('returns 200 and renders index page', () => {
      return request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
    });
  });

  describe('GET /api/getScores', () => {
    it('returns 200 and the top five scores JSON', async () => {
      return request(app)
        .get('/api/getScores')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal(sortedTopFiveScores);
        })
    });
  });

  describe('POST /api/submitEntry', () => {
    it('returns 400 and a JSON message if entry is not valid', () => {
      return request(app)
        .post('/api/submitEntry')
        .set('Accept', 'application/json')
        .send({ name: '', word: 'car' })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body).to.deep.equal(entryNotValidMessage);
        })
    });

    it('returns 400 and a JSON message explaining word is not a palindrome', () => {
      return request(app)
        .post('/api/submitEntry')
        .set('Accept', 'application/json')
        .send({ name: 'Aneel', word: 'car' })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(response => {
          expect(response.body).to.deep.equal(jsonNotPalindromeMessage);
        })
    });

    it('returns 200 and a JSON message with points scored when word is a palindrome', () => {
      const pointsScore = { points: 7 };

      return request(app)
        .post('/api/submitEntry')
        .set('Accept', 'application/json')
        .send({ name: 'Aneel', word: 'racecar' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal(pointsScore);
        })
    });
  });

  describe('unknown route', () => {
    it('returns 404 and a JSON error message', () => {
      const notFoundMessage = { error: 'Not found' };

      return request(app)
        .get('/api/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(response => {
          expect(response.body).to.deep.equal(notFoundMessage);
        })
    });
  });
});
