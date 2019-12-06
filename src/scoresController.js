const ScoresModel = require('./scoresModel');

class ScoresController {
  static getTopScores(req, res, next) {
    const sortedScores = ScoresModel.getTopScores();

    res.status(200).json(sortedScores);
  }
}

module.exports = ScoresController;