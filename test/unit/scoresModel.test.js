'use strict'

const { expect } = require('chai');

const { getTopScores, addNewEntry } = require('../../src/scoresModel');

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

  describe('#addNewEntry', () => {
    it('adds a new entry to top scores', () => {
      const newTopFiveScores = [
        {name: 'Charles', points: 15},
        {name: 'Aneel', points: 7},
        {name: 'Bob', points: 6},
        {name: 'Aneel', points: 5},
        {name: 'Fiona', points: 5},
      ];

      const newEntry = { name: 'Aneel', word: 'racecar' };

      addNewEntry(newEntry);

      const returnedScores = getTopScores();

      expect(returnedScores).to.deep.equal(newTopFiveScores);
    });
  });
});