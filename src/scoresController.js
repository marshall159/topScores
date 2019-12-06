const ScoresModel = require('./scoresModel');
const Palindrome = require('./palindrome');

class ScoresController {
  static homePage(req, res, next) {
    res.status(200).render('index.html');
  }

  static getTopScores(req, res, next) {
    const sortedScores = ScoresModel.getTopScores();

    res.status(200).json(sortedScores);
  }

  static validateEntry(req, res, next) {
    const palindrome = Palindrome.isPalindrome(req.body.word);

    if (palindrome) {
      return next();
    }

    return res.status(400).json({ message: 'Word is not a palindrome'});
  }

  static addEntry(req, res, next) {
    const points = ScoresModel.addNewEntry(req.body);

    res.status(200).json({ points });
  }
}

module.exports = ScoresController;