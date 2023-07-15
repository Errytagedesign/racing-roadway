const express = require('express');
const app = express();
const races = require('./routes/routers');
const racers = require('./routes/racersRouter');
const connectDB = require('./db/connectToDb');
require('dotenv').config();
const notFound = require('./middleware/notFound');
const cors = require('cors');

// Enable CORS
app.use(cors());
// After deploying the backend to render, they'll provide their default port, so use that we'll set it to accept their port or 5000 port on your computer, you can change the 5000 to any number
const port = process.env.PORT || 5000;

// Use json method to return response
app.use(express.json());

// Default Routes to see your backend operation onbrowser
// Route for creating races
app.use('/api/v1/races', races);
// Route for creating best racers
app.use('/api/v1/racers', racers);

// if routes doesnt match return not found message
app.use(notFound);

const startServer = async () => {
  try {
    // only Start the server if the connction to the DB is successful else throw error
    await connectDB(process.env.DB_URI);
    app.listen(port, console.log(`server here ${port}`));
  } catch (error) {
    console.log(error);
  }
};

// To start the server run npm start
startServer();
