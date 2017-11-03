const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      mongoose = require('mongoose'),
      path = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','login.html'));
});

app.post('/registerrequest', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
});

app.post('/loginrequest', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
});

app.listen(3000, () => {
    console.log('Server running on port 3000!');
});