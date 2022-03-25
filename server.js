// Import coin module
import { coinFlip, coinFlips, flipACoin } from "./modules/coin.mjs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


// Require Express and minimalist
const express = require('express')
const app = express()
const HTTP_PORT = (require('minimist')(process.argv.slice(2)).port) || 5000

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

// Check endpoint /app/flip/call/heads/
app.get('/app/flip/call/heads/', (req, res)=> {
    // Respond with status 200
    res.statusCode = 200;
    res.statusMessage = "OK"
    // Write JSON object
    res.json(flipACoin("heads"))
});

// Check endpoint /app/flip/call/tails/
app.get('/app/flip/call/tails/', (req, res)=> {
    // Respond with status 200
    res.statusCode = 200;
    res.statusMessage = "OK"
    // Write JSON object
    res.json(flipACoin("tails"))
});

// Check endpoint /app/flips/param:[number]
app.get('/app/flips/:number', (req, res)=> {
    const flips = coinFlips(req.params.number)
    // Respond with status 200
    res.statusCode = 200;
    res.statusMessage = "OK"
    // Write JSON object
    res.json(flips)
});

// Check endpoint /app/flip/
app.get('/app/flip/', (req, res)=> {
    // Respond with status 200
    res.statusCode = 200;
    res.statusMessage = "OK"
    // Write JSON object
    res.json(coinFlip())
});

// Check endpoint /app/
app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

// Default response for any request
app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
});

