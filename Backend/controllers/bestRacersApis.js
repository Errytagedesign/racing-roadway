// LIST OF APIs TO CREATE
//a. Get All races using get method
//b. Create new race using Post method
//c. Get a single race by an ID using get method with id as aparams
//d. Update a racer based on its ID by using put method
//e. Delete race based on Its ID using the delete methdd

const raceShcemas = require('../models/racersScheme');

//a. Get All races using get method
const getAllRacers = async (req, res) => {
  try {
    // This is mongoose method, you can find depper explanation here: https://mongoosejs.com/docs/api/model.html#Model.find()
    const allRacers = await raceShcemas.find({});
    res.status(200).json({ allRacers });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//b. Create new race using Post method
const addRacer = async (req, res) => {
  try {
    const racer = await raceShcemas.create(req.body);
    res.status(201).json({ racer });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//c. Get a single race by an ID using get method with id as aparams
const getRacer = async (req, res) => {
  try {
    // Only get race a matchin id with the clicked one
    const racerID = req.params.id;

    const racer = await raceShcemas.findOne({ _id: racerID });

    // If the id of the clicked race isn't availabe return not found
    if (!racer) {
      return res.status(404).json({ msg: `No Race with the id: ${racerID}` });
    }

    res.status(200).json({ racer });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//d. Update a racer based on its ID by using put method
const updateRacer = async (req, res) => {
  try {
    // Only get race a matchin id with the clicked one
    const racerID = req.params.id;

    const racer = await raceShcemas.findOneAndUpdate(
      { _id: racerID },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    // If the id of the clicked race isn't availabe return not found
    if (!racer) {
      return res.status(404).json({ msg: `No Race with the id: ${racerID}` });
    }

    res.status(200).json({ racer });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//e. Delete race based on Its ID using the delete methdd
const deleteRacer = async (req, res) => {
  try {
    // Only get race a matchin id with the clicked one
    const racerID = req.params.id;

    const racer = await raceShcemas.findOneAndDelete({ _id: racerID });

    // If the id of the clicked race isn't availabe return not found
    if (!racer) {
      return res.status(404).json({ msg: `No Race with the id: ${racerID}` });
    }

    res.status(200).send();
    // res.status(200).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

// exorpt all apis
module.exports = { getAllRacers, getRacer, addRacer, deleteRacer, updateRacer };
