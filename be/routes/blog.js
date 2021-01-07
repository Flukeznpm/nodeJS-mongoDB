const e = require('express');
const express = require('express')
const router = express.Router()
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
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
    } else {
        const name = req.body.name;
        const desc = req.body.description;
        const author = req.body.author;

        // insert to DB
    }



});

module.exports = router