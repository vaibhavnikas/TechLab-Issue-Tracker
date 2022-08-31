const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const path = require('path');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'issue-tracker',
    secret: 'changeTheSecretB4deployment',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }, 
    store : MongoStore.create(
        {
            mongoUrl: db._connectionString,
            mongoOptions: {
                family: 4
            },
            mongooseConnection: db,
            autoRemove: 'disabled',
            touchAfter: 24 * 3600
        }, 
        function(err){
            console.log(err || 'connect mongo-db setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`error in starting the server : ${err}`);
        return;
    }

    console.log(`server is up and running on port : ${port}`);
});