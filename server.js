if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose')
const Dispense = require('./models/dispenseModel')
const path = require('path');

const app = express();

app.use(express.json())

const authenticateKey = (req, res, next) => {
    let api_key = req.header("x-api-key");
    if (process.env.TEST_API_KEY == api_key) {
        console.log("Authenticated API call");
        next();
    }
    else {
        console.log("Authentication error.");
        console.log(process.env.TEST_API_KEY);
        console.log(api_key);
        res.status(403).send({ error: { code: 403, message: "Authentication error." } });
    }
};

// Define the endpoint for dispense event
app.post('/dispense', authenticateKey, async(req, res) => {
    try {
        const dispense = await Dispense.create(req.body);
        console.log(req.body);
        res.status(200).send('Dispense record stored in the DB successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

mongoose.set("strictQuery", false)
mongoose.
    connect(process.env.DATABASE_URL)
    .then(() => { 
        console.log('Connected to DB.')
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running.`);
        });
    }).catch((error) => {
        console.log(error)
    })
    
