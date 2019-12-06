const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const ScoresController = require('../../src/scoresController');
const ScoresModel = require('../../src/scoresModel');

describe('ScoresController', () => {
  let req;
  let res;
  let next;
  let sortedTopFiveScores;
  let scoresModelTopScoresStub

  beforeEach(() => {
    req = {};

    res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    next = sinon.stub();

    sortedTopFiveScores = [
      {name: 'Caroline', points: 15},
      {name: 'Ben', points: 6},
      {name: 'Aneel', points: 5},
      {name: 'Farah', points: 5},
      {name: 'Elena', points: 4},
    ];

    scoresModelTopScoresStub = sinon.stub(ScoresModel, 'getTopScores');
    scoresModelTopScoresStub.returns(sortedTopFiveScores)
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#getTopScores', () => {
    it('calls Scoresmodel to get top scores', () => {
      ScoresController.getTopScores(req, res, next);
      
      expect(scoresModelTopScoresStub).calledOnce;
    });

    it('sends status code 200 and top scores as JSON', () => {
      ScoresController.getTopScores(req, res, next);
      
      expect(res.status).calledOnceWith(200);
      expect(res.json).calledOnceWith(sortedTopFiveScores);
    });
  });
});