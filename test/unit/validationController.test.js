'use strict'

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const ValidationController = require('../../src/validationController');
const Palindrome = require('../../src/palindrome');
const Validation =require('../../src/validation');

describe('ValidationController', () => {
  const palindrome = 'racecar';
  const notPalindrome = 'hello';

  let req;
  let res;
  let next;
  let validationSpy;
  let palindromeSpy;

  beforeEach(() => {
    req = {
      body: {}
    };

    res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    next = sinon.stub();

    validationSpy = sinon.spy(Validation, 'hasAllValidParameters');

    palindromeSpy = sinon.spy(Palindrome, 'isPalindrome');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#validateEntry', () => {
    it('calls Validation to validate entry', () => {
      ValidationController.validateEntry(req, res, next);
      
      expect(validationSpy).calledOnce;
    });

    it('calls next in the middleware chain if entry is valid', () => {
      req.body.name = 'Aneel';
      req.body.word = palindrome;

      ValidationController.validateEntry(req, res, next);

      expect(next).calledOnce;
    });

    it('returns a status 400 and JSON error message if entry is not valid', () => {
      req.body.name = '';
      req.body.word = palindrome;

      ValidationController.validateEntry(req, res, next);

      expect(res.status).calledOnceWithExactly(400);
      expect(res.json).calledOnceWith({ message: 'Entry is not valid' });
    });
  });

  describe('#checkPalindrome', () => {
    it('calls Palindrome#isPalindrome to verify if word is a palindrome', () => {
      req.body.word = palindrome;

      ValidationController.checkPalindrome(req, res, next);

      expect(palindromeSpy).calledOnceWith(palindrome);
    });

    it('calls next in the middleware chain if word is a palindrome', () => {
      req.body.word = palindrome;

      ValidationController.checkPalindrome(req, res, next);

      expect(next).calledOnce;
    });

    it('returns a status 400 and JSON error message if word is not a palindrome', () => {
      req.body.word = notPalindrome;

      ValidationController.checkPalindrome(req, res, next);

      expect(res.status).calledOnceWithExactly(400);
      expect(res.json).calledOnceWith({ message: 'Word is not a palindrome' });
    });
  });
});