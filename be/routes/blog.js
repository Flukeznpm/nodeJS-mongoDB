const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nattapong:0504254213242Fk.@sandbox.2ng5o.mongodb.net/Sandbox?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true });
const { check, validationResult } = require('express-validator');

router.get('/', function (req, res, next) {
    res.render("blog");
});

router.get('/add', function (req, res, next) {
    res.render("addBlog");
});

router.post('/add', [
    check("name", "Please input your blog name").not().isEmpty(),
    check("description", "Please input your blog description").not().isEmpty(),
    check("author", "Please input your blog author").not().isEmpty()
], async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
    } else {
        const name = req.body.name;
        const desc = req.body.description;
        const author = req.body.author;

        db.connect(function (err) {
            if (err) throw (err)

            var data_blogs = {
                name: name,
                description: desc,
                author: author
            };

            db.db("TutorialDB").collection("blogs").insertOne(data_blogs, function (err, res) {
                if (err) throw (err)
                console.log("> 1 document inserted");
                db.close();
            });
        });
        res.redirect('/');
    }
});

module.exports = router