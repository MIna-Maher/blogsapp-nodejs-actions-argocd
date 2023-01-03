const blogRoute = require('./routes/routesBlogs');
const express = require('express');
//morgan http requester logger.
//const morgan = require('morgan');
const mongoose = require('mongoose'); //Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
require('dotenv').config();


//create express app
const app = express();
// we will use ejs as view engine.
app.set('view engine', 'ejs');  //by default look for ejs files in views dir
mongoose.connect(process.env.dbMongo, { 
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true, useUnifiedTopology: true }) //asyn task
.then((result) => {app.listen("3000"), console.log('the DB is now connected and app is running!!')})
.catch((err) => console.log("error connecting to DB", err));
//app.use(morgan('dev'));
//use express midlware & static files"pubish any files to the browser within public folder.
app.use(express.static('public/'));
//the below midlware to take the data from FE and pass it to the request object.
app.use(express.urlencoded({ extended: true}));
app.get('/', (req, res) => {
   /* const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ]
    //res.sendFile('./views/index.html', {root: __dirname}); 
    // send has 2 benfits: automatically set the header and send the status for us.
    res.render('index', {title: 'Home', blogs }); */
    res.redirect('/blogs');
});
//blog routes
///////////////////////////////////
app.use('/blogs', blogRoute);
//////////////////////////
// render
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

//redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

//404 status : not found//
//in express we use : use and must be exists on the last
app.use((req, res) => {
    res.status(404).render('404', {title: "Error!!"});
})
//the code run from top to buttom.404 page has to be at the buttom 