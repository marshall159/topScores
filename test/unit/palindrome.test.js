const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const Palindrome = require('../../src/palindrome');

describe('Palindrome', () => {
  it('word "bob" is a palindrome', () => {
    const word = 'bob';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.true;
  });

  it('word "bo" is not a palindrome', () => {
    const word = 'bo';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.false;
  });

  it('empty string "" is not a palindrome', () => {
    const word = '';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.false;
  });
});