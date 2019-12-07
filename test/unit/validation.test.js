const { expect } = require('chai');

const { isStr, isEmpty, hasRequiredProperties, hasAllValidParameters } = require('../../src/validation');

describe('Validation', () => {
  describe('#isString', () => {
    it('returns true for a string value', () => {
      const name = 'Aneel';

      expect(isStr(name)).to.be.true;
    });

    it('returns false for non-string value', () => {
      const number = 123;

      expect(isStr(number)).to.be.false;
    });
  });

  describe('#isEmpty', () => {
    it('returns true for an empty string value', () => {
      const name = '';

      expect(isEmpty(name)).to.be.true;
    });

    it('returns false for non-empty string value', () => {
      const name = 'Aneel';

      expect(isEmpty(name)).to.be.false;
    });
  });

  describe('#hasRequiredProperties', () => {
    it('returns true if object has "name" and "word" properties', () => {
      const reqBody = {
        "name": "Aneel",
        "word": "racecar"
      };

      expect(hasRequiredProperties(reqBody)).to.be.true;
    });

    it('returns false if object does not have "name" and "word" properties', () => {
      const reqBody = {
        "word": "racecar"
      };

      expect(hasRequiredProperties(reqBody)).to.be.false;
    });
  });

  describe('#hasAllValidParameters', () => {
    it('returns true if all required parameters are valid', () => {
      const reqBody = {
        "name": "Aneel",
        "word": "racecar"
      };

      expect(hasAllValidParameters(reqBody)).to.be.true;
    });
  });

  it('returns false if all required parameters are not valid', () => {
    const reqBody = {
      "name": "",
      "word": "racecar"
    };

    expect(hasAllValidParameters(reqBody)).to.be.false;
  });
  
});