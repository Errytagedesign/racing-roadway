// LIST OF APIs TO CREATE
//a. Get All races using get method
//b. Create new race using Post method
//c. Get a single race by an ID using get method with id as aparams
//d. Update a racer based on its ID by using put method
//e. Delete race based on Its ID using the delete methdd

const raceShcemas = require('../models/mongooseSchemas');

//a. Get All races using get method
const getAllRace = async (req, res) => {
  try {
    // This is mongoose method, you can find depper explanation here: https://mongoosejs.com/docs/api/model.html#Model.find()
    const allRace = await raceShcemas.find({});
    res.status(200).json({ allRace });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//b. Create new race using Post method
const createRace = async (req, res) => {
  try {
    const race = await raceShcemas.create(req.body);
    res.status(201).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//c. Get a single race by an ID using get method with id as aparams
const getRace = async (req, res) => {
  try {
    // Only get race a matchin id with the clicked one
    const raceID = req.params.id;

    const race = await raceShcemas.findOne({ _id: raceID });

    // If the id of the clicked race isn't availabe return not found
    if (!race) {
      return res.status(404).json({ msg: `No Race with the id: ${raceID}` });
    }

    res.status(200).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//d. Update a racer based on its ID by using put method
const updateRace = async (req, res) => {
  try {
    // Only get race a matchin id with the clicked one
    const raceID = req.params.id;

    const race = await raceShcemas.findOneAndUpdate({ _id: raceID }, req.body, {
      new: true,
      runValidators: true,
    });

    // If the id of the clicked race isn't availabe return not found
    if (!race) {
      return res.status(404).json({ msg: `No Race with the id: ${raceID}` });
    }

    res.status(200).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

//e. Delete race based on Its ID using the delete methdd
const deleteRace = async (req, res) => {
  try {
    // Only get race a matchin id with the clicked one
    const raceID = req.params.id;

    const race = await raceShcemas.findOneAndDelete({ _id: raceID });

    // If the id of the clicked race isn't availabe return not found
    if (!race) {
      return res.status(404).json({ msg: `No Race with the id: ${raceID}` });
    }

    res.status(200).send();
    // res.status(200).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

// exorpt all apis
module.exports = { getAllRace, getRace, createRace, deleteRace, updateRace };
