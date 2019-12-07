'use strict'

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const ScoresController = require('../../src/scoresController');
const ScoresModel = require('../../src/scoresModel');
const Palindrome = require('../../src/palindrome');
const Validation =require('../../src/validation');

describe('ScoresController', () => {
  const palindrome = 'racecar';
  const notPalindrome = 'hello';

  let req;
  let res;
  let next;
  let sortedTopFiveScores;
  let scoresModelTopScoresStub
  let scoresModelAddNewEntryStub;
  let validationSpy;
  let palindromeSpy;

  beforeEach(() => {
    req = {
      body: {}
    };

    res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.render = sinon.stub().returns(res);

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

    scoresModelAddNewEntryStub = sinon.stub(ScoresModel, 'addNewEntry');
    scoresModelAddNewEntryStub.returns(4);

    validationSpy = sinon.spy(Validation, 'hasAllValidParameters');

    palindromeSpy = sinon.spy(Palindrome, 'isPalindrome');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#homePage', () => {
    it('send status code 200 and renders index.html', () => {
      ScoresController.homePage(req, res, next);
      
      expect(res.status).calledOnceWith(200);
      expect(res.render).calledOnceWith('index.html');
    });
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

  describe('#validateEntry', () => {
    it('calls Validation to validate entry', () => {
      ScoresController.validateEntry(req, res, next);
      
      expect(validationSpy).calledOnce;
    });

    it('calls next in the middleware chain if entry is valid', () => {
      req.body.name = 'Aneel';
      req.body.word = palindrome;

      ScoresController.validateEntry(req, res, next);

      expect(next).calledOnce;
    });

    it('returns a status 400 and JSON error message if entry is not valid', () => {
      req.body.name = '';
      req.body.word = palindrome;

      ScoresController.validateEntry(req, res, next);

      expect(res.status).calledOnceWithExactly(400);
      expect(res.json).calledOnceWith({ message: 'Entry is not valid' });
    });
  });

  describe('#checkPalindrome', () => {
    it('calls Palindrome#isPalindrome to verify if word is a palindrome', () => {
      req.body.word = palindrome;

      ScoresController.checkPalindrome(req, res, next);

      expect(palindromeSpy).calledOnceWith(palindrome);
    });

    it('calls next in the middleware chain if word is a palindrome', () => {
      req.body.word = palindrome;

      ScoresController.checkPalindrome(req, res, next);

      expect(next).calledOnce;
    });

    it('returns a status 400 and JSON error message if word is not a palindrome', () => {
      req.body.word = notPalindrome;

      ScoresController.checkPalindrome(req, res, next);

      expect(res.status).calledOnceWithExactly(400);
      expect(res.json).calledOnceWith({ message: 'Word is not a palindrome' });
    });
  });

  describe('#addEntry', () => {
    it('calls Scoresmodel#addNewEntry to save the entry', () => {
      req.body.name = 'Aneel';
      req.body.word = palindrome;

      ScoresController.addEntry(req, res, next);

      expect(scoresModelAddNewEntryStub).calledOnceWith(req.body);
    });

    it('sends status code 200 and points scored as JSON', () => {
      req.body.name = 'Aneel';
      req.body.word = 'toot';

      ScoresController.addEntry(req, res, next);

      expect(res.status).calledOnceWithExactly(200);
      expect(res.json).calledOnceWith({ points: 4 });
    });
  });
});