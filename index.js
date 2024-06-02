
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors=require('cors');
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

app.post('/l', (req, res) => {
    console.log('Received location request');
    const { latitude, longitude } = req.body;
    console.log(`Received location: ${latitude}, ${longitude}`);
    res.json({ status: 'success', latitude, longitude });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
