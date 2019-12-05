const scoreValues = [
  {name: 'Aneel', points: 5},
  {name: 'Bob', points: 6},
  {name: 'Charles', points: 15},
  {name: 'Diana', points: 3},
  {name: 'Eva', points: 4},
  {name: 'Fiona', points: 5},
];

class ScoresModel {
  constructor(scores = scoreValues) {
    this.scores = scores;
  }

  getTopScores() {
    return this.scores.sort((a, b) => b.points - a.points).slice(0, 5);
  }
}

module.exports = ScoresModel;