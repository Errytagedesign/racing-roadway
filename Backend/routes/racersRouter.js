// set Routes for the APIs
const express = require('express');
const router = express.Router();

// Get all apis and create a route for each
const {
  getRacer,
  getAllRacers,
  updateRacer,
  deleteRacer,
  addRacer,
} = require('../controllers/bestRacersApis');

router.route('/').get(getAllRacers).post(addRacer);
router.route('/:id').get(getRacer).put(updateRacer).delete(deleteRacer);

module.exports = router;
