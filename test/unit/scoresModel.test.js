const { expect } = require('chai');

const ScoresModel = require('../../src/scoresModel');

describe('Scores', () => {
  let mockScores;
  let sortedTopFiveScores;
  let scoresModel;

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

    scoresModel = new ScoresModel(mockScores);

  });

  describe('#getTopScores', () => {
    it('returns the top five scores in sorted order', () => {
      const returnedScores = scoresModel.getTopScores();

      expect(returnedScores).to.deep.equal(sortedTopFiveScores);
    });
  });
});