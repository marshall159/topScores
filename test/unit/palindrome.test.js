'use strict'

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

  it('word "kAyAK" is a palindrome as palindromes are case insensitive', () => {
    const word = 'kAyAK';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.true;
  });

  it('word "123321" composed of numbers is a palindrome', () => {
    const word = '123321';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.true;
  });

  it('word "123" composed of numbers is not a palindrome', () => {
    const word = '123';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.false;
  });

  it('word "12noon21" composed of numbers and characters is a palindrome', () => {
    const word = '12noon21';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.true;
  });

  it('word/phrase "a man a plan a canal panama" is a palindrome', () => {
    const word = 'a man a plan a canal panama';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.true;
  });

  it('word/phrase "..a !  $$man a plan a canal p anam$$!a.." with punctuation and other characters is a palindrome', () => {
    const word = '..a !  $$man a plan a canal p anam$$!a..';

    const result = Palindrome.isPalindrome(word);

    expect(result).to.be.true;
  });
});