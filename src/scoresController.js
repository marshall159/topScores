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
    let points;
    
    try {
      points = ScoresModel.addNewEntry(req.body);
    } catch (error) {
      next(error);
    }

    res.status(200).json({ points });
  }
}

module.exports = ScoresController;