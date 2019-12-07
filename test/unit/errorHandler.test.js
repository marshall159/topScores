const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const ErrorHandler = require('../../src/errorHandler');

describe('Error Handler', () => {
  let err;
  let req;
  let res;
  let next;
  let consoleStub;

  beforeEach(() => {
    err = new Error('oops');

    req = {};

    res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    next = sinon.stub();

    consoleStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#serverError', () => {
    it('logs the error to the console', () => {
      ErrorHandler.serverError(err, req, res, next);
  
      expect(consoleStub).calledOnceWith(err);
    });
  
    it('calls res with status code 500 and sends JSON with error message', () => {
      ErrorHandler.serverError(err, req, res, next);
  
      expect(res.status).calledOnceWith(500);
      expect(res.json).calledOnceWith({ error: 'Server error' });
    });
  });

  describe('#notFound', () => {
    it('calls res with status code 404 and sends JSON with error message', () => {
      ErrorHandler.notFound(req, res, next);
  
      expect(res.status).calledOnceWith(404);
      expect(res.json).calledOnceWith({ error: 'Not found' });
    });
  });

});