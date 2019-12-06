'use strict'

const { expect } = require('chai');
const rewire = require("rewire");
 
const ScoresModel = rewire('../../src/scoresModel');

describe('ScoresModel', () => {
  const mockScores = [
    {name: 'Aneel', points: 5},
    {name: 'Ben', points: 6},
    {name: 'Caroline', points: 15},
    {name: 'David', points: 3},
    {name: 'Elena', points: 4},
    {name: 'Farah', points: 5},
  ];

  ScoresModel.__set__('scores', mockScores);

  describe('#getTopScores', () => {
    it('returns the top five scores in sorted order', () => {
      const sortedTopFiveScores = [
        {name: 'Caroline', points: 15},
        {name: 'Ben', points: 6},
        {name: 'Aneel', points: 5},
        {name: 'Farah', points: 5},
        {name: 'Elena', points: 4},
      ];

      const returnedScores = ScoresModel.getTopScores(mockScores);

      expect(returnedScores).to.deep.equal(sortedTopFiveScores);
    });
  });

  describe('#addNewEntry', () => {
    it('adds a new entry to top scores', () => {
      const newTopFiveScores = [
        {name: 'Caroline', points: 15},
        {name: 'Aneel', points: 7},
        {name: 'Ben', points: 6},
        {name: 'Aneel', points: 5},
        {name: 'Farah', points: 5},
      ];

      const newEntry = { name: 'Aneel', word: 'racecar' };

      ScoresModel.addNewEntry(newEntry);

      const returnedScores = ScoresModel.getTopScores();

      expect(returnedScores).to.deep.equal(newTopFiveScores);
    });
  });
});