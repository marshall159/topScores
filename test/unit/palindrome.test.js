const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const Palindrome = require('../../src/palindrome');

describe('Palindrome', () => {
  it('passes canary test', () => {
    expect(true).to.be.true;
  });
});