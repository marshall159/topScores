'use strict'

const { expect } = require('chai');

const { getTopScores } = require('../../src/scoresModel');

describe('ScoresModel', () => {
  let mockScores;
  let sortedTopFiveScores;

  beforeEach(() => {
    mockScores = [
      {name: 'Aneel', points: 5},
      {name: 'Ben', points: 6},
      {name: 'Caroline', points: 15},
      {name: 'David', points: 3},
      {name: 'Elena', points: 4},
      {name: 'Farah', points: 5},
    ];

    sortedTopFiveScores = [
      {name: 'Caroline', points: 15},
      {name: 'Ben', points: 6},
      {name: 'Aneel', points: 5},
      {name: 'Farah', points: 5},
      {name: 'Elena', points: 4},
    ];

  });

  describe('#getTopScores', () => {
    it('returns the top five scores in sorted order', () => {
      const returnedScores = getTopScores(mockScores);

      expect(returnedScores).to.deep.equal(sortedTopFiveScores);
    });
  });
});