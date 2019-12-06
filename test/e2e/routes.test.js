const request = require('supertest');
const { expect } = require('chai');

const app = require('../../server');

describe('Routes', () => {
  const jsonNotPalindromeMessage = { message: 'Word is not a palindrome' };
  
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

  describe('GET /api/getScores', () => {
    it('returns 200 and returns top five scores JSON', async () => {
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
  });
});
