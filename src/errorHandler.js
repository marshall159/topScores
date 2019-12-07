function serverError(err, req, res, next) {
  console.error(err);
  return res.status(500).json({ error: 'Server error' });
}

function notFound(req, res, next) {
  return res.status(404).json({ error: 'Not found' });
}

module.exports = {
  serverError,
  notFound
};