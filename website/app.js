/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f7fb24f7a25261a7d21e7f76c870787c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// gets Weather data when generate button clicked
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipcode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    getWeatherData(baseUrl + zipcode + apiKey)
        .then(function (data) {
            console.log(data);
            postData('/add', { "temp": data.main.temp, "date": newDate, "userResponse": userResponse });
        })
        .then(updateUI)
}

// gets data from the weather API
const getWeatherData = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        // checks if zipcode entered is OK or not
        if (data.cod === 200) {
            return data;
        }
        else {
            alert('Enter valid zipcode!');
        }
    }
    catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

// POST Route function to send data to the server
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData
    }
    catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}

// to update the UI with recieved weather data
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        // transform into JSON
        const allData = await request.json();
        // write updated data to DOM elements
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = (Math.round(allData.temp - 273)) + '°C';
        document.getElementById('content').innerHTML = allData.userResponse;
    }
    catch (error) {
        // appropriately handle the error
        console.log("error", error);
    }
}
