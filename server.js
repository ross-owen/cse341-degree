const express = require('express');
const mongo = require('./data');
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3002;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE, OPTIONS');
        next();
    })
    .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH']}))
    .use(cors({origin: '*'}))
    .use('/', require('./routes'));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CLIENT_CALLBACKURL
    },
    function (accessToken, refreshToken, profile, done) {
        // TODO: persist user to mongodb
        // User.findOrCreate({githubId: profile.id }, function (err, user) {
        return done(null, profile);
        // });
    }));
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((id, done) => {
    done(null, user);
})

mongo.init((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => console.log(`DB live. Listening on port: ${port}`));
    }
})

