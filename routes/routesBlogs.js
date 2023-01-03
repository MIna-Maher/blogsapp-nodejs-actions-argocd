const express = require('express');
const Blog = require("../models/blog");  

const routes = express.Router()  //create new instance of Router object.

routes.get('/', (req, res) => {
    Blog.find().sort({createdAt: -1}) //-1 : ordering them
    .then((result) => {
     res.render('index', {title: 'All Blogs', blogs: result }); //sending blogs to index.html
    })
    .catch((err) => {
        console.log(err);
    })
})

routes.get('/create/', (req, res) => {
    res.render('create', {title: 'Crete New Blog'});
});
//post request.
routes.post('/', (req, res) => {
    const blog = new Blog(req.body); //defining new instance of blog model we created.
    blog.save()
    .then((result) => {
     res.redirect('/');

    })
    .catch((err) => {
        console.log(err);
    })
});



//redirects
routes.get('/about-me', (req, res) => {
    res.redirect('/about');
});

routes.get('/:mina', (req, res) => {
    const id = req.params.mina;
    Blog.findById(id)
    .then((result) => {
    res.render('details', {blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    })
    
})

// delete from request from frontend
routes.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({ redirect: '/'});
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = routes;
