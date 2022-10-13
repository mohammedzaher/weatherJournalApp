// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 5500;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port, () => console.log(`running on localhost: ${port}`));

// GET Route that returns project data
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
}

// POST Route that adds incoming data to projectData
app.post('/add', recieveData);

function recieveData(req, res) {
    const newEntry = {
        "temp": req.body.temp,
        "date": req.body.date,
        "userResponse": req.body.userResponse
    };
    projectData = newEntry;
    res.send(projectData);
    console.log('projectData');
    console.log(projectData);
}