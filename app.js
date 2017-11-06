const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('./models/user.js');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const hbs = require('hbs');

mongoose.connect('mongodb://localhost:27017/nodejsauth');
let db = mongoose.connection;
mongoose.Promise = global.Promise;

app.set('view enigne', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    cookie: {domain: 'localhost'},
    store: new MongoStore({
        mongooseConnection: db
    })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log(req.session);
    if(req.session.userId){
        res.redirect('/home');
    }
    else 
        res.sendFile(path.join(__dirname,'public','login.html'));
});

app.get('/home', (req, res) => {
    if(req.session.userId){
        User.findOne({
            _id: req.session.userId
        }).then((user) => {
            res.render('home.hbs', {
                username: user.username
            });
        });
    }
    else {
        res.status(401).send('Not Authenticated!');
    }
});

app.post('/registerrequest', (req, res) => {
    console.log('Inside registerrequest');
    
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(username && password && email) {
        let userData = {
            username,
            password,
            email
        };
        let user = new User(userData);
        user.save().then((doc) => {
            if(!doc)
                res.status(400).send('Bad request');
            else res.send(_.pick(doc, ['_id','username','email']));
        }).catch(e => {
            res.status(400).send(e);
        });
    } else {
        res.status(400).send('Bad request');
    }
});

app.post('/loginrequest', (req, res) => {
    
    console.log('Inside loginrequest');    
    let username = req.body.username;
    let password = req.body.password;
    let userData = {username, password};
    
    User.authenticate(username, password, (err, user) => {
        // console.log(user);
        if(!user) {
            res.status(401).send('Not authenticated');
        }
        else {
            // res.redirect('/home.html');
            req.session.userId = user._id;
            res.redirect('/home');
        }
    });
    
});

app.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy((err) => {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

app.listen(3000, () => {
    console.log(`Server running on port ${3000}!`);
});