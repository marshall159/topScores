const Palindrome = require('./palindrome');
const Validation = require('./validation');

class ValidationController {
  static validateEntry(req, res, next) {
    const isValid = Validation.hasAllValidParameters(req.body);

    if (isValid) {
      return next();
    }

    return res.status(400).json({ message: 'Entry is not valid'})
  }

  static checkPalindrome(req, res, next) {
    const palindrome = Palindrome.isPalindrome(req.body.word);

    if (palindrome) {
      return next();
    }

    return res.status(400).json({ message: 'Word is not a palindrome'});
  }
}

module.exports = ValidationController;