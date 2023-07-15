const notFound = (req, res) => res.status(404).send('Routes Not found');

module.exports = notFound;
