const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.render("blog");
});

router.get('/add', function (req, res, next) {
    res.render("addBlog");
});

module.exports = router