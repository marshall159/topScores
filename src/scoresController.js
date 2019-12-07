const ScoresModel = require('./scoresModel');

class ScoresController {
  static homePage(req, res, next) {
    res.status(200).render('index.html');
  }

  static getTopScores(req, res, next) {
    const sortedScores = ScoresModel.getTopScores();

    res.status(200).json(sortedScores);
  }

  static addEntry(req, res, next) {
    const points = ScoresModel.addNewEntry(req.body);

    res.status(200).json({ points });
  }
}

module.exports = ScoresController;