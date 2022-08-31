const express = require('express');
const env = require('./config/environment');

// used cookie-parser to parse cookie header and populate req.cookies with an object keyed by the cookie names
const cookieParser = require('cookie-parser');

// instantiate express and assign app variable to it
const app = express();

// called function exported from view-helpers and passed app as an argument to it
require('./config/view-helpers')(app);

const port = process.env.PORT || 8000;

// used express-ejs-layouts to setup layout for the app
const expressLayouts = require('express-ejs-layouts');

// accessed db exported from mongoose.js
const db = require('./config/mongoose');
// used to create and manage express sessions
const session = require('express-session');

// used passport and passportLocal for user authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// used connect-mongo to store express sessions to database
const MongoStore = require('connect-mongo');

// used node-sass-middleware to recompile .scss or .sass files automatically
const sassMiddleware = require('node-sass-middleware');

// used flash to display success and error notifications
const flash = require('connect-flash');

// this custom middleware sets flash messages from request to response
const customMware = require('./config/middleware');
const path = require('path');

if(env.name == 'development'){
    // used node-sass-middleware
    app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
    }));
}

// used express.urlencoded() as a middleware to parse data received from post requests
app.use(express.urlencoded());

// used cookie-parser as a middleware to parse cookies as mentioned above
app.use(cookieParser());

// used to serve static files such as css or js files
app.use(express.static(env.asset_path));

// used express-ejs-layouts as a middleware as mentioned above
app.use(expressLayouts);

// used to extract css and js files into layout.ejs at designated places
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// used to create and manage express sessions
app.use(session({
    name: 'issue-tracker',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }, 
    store : MongoStore.create(  // used to store session into database
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

// initilizing passport for user authentication
app.use(passport.initialize());
app.use(passport.session());

// setAuthenticated user is a custom function to set authenticated user to res.locals
app.use(passport.setAuthenticatedUser);

// used connect-flash as a middleware as mentioned above to display notifications
app.use(flash());
// used custom middleware 
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

// app starts server and starts listening to requests on defined port
app.listen(port, function(err){
    if(err){
        console.log(`error in starting the server : ${err}`);
        return;
    }

    console.log(`server is up and running on port : ${port}`);
});