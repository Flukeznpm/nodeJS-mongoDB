const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nattapong:0504254213242Fk.@sandbox.2ng5o.mongodb.net/Sandbox?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true });
const { check, validationResult } = require('express-validator');

router.get('/', function (req, res, next) {
    const blogs_list = [];

    db.connect(function (err) {
        if (err) throw (err)

        db.db("TutorialDB").collection("blogs").aggregate([
            {
                $lookup:
                {
                    from: 'author',
                    localField: 'author_id',
                    foreignField: 'author_id',
                    as: 'author_join'
                }
            }
        ]).toArray(function (err, res) {
            if (err) throw err;

            // Way 1 

            const list = JSON.stringify(res);
            console.log('blogs_list:', list);

            // Way 2
            
            // const list = res;
            // const name = list.map(n => n.name).toString();
            // const description = list.map(d => d.description).toString();
            // const author_list = list.map(aj => aj.author_join);
            // const results = {
            //     blog_name: name,
            //     blog_description: description,
            //     blog_author: author_list
            // }
            // blogs_list.push(results);
            // console.log('blogs_list:', res);

            db.close();
        });

        // db.db("TutorialDB").collection("blogs").find({}).toArray(function (err, result) {
        //     if (err) throw (err)
        //     const results = {
        //         Blog_Name:,
        //         Blog_description:,
        //         Blog_Author:
        //     }
        //     console.log('All blog: ', results);
        //     db.close();
        //     res.render("blog", result);
        // });


    });
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

router.post('/update', function (req, res) {
    const name = req.body.name;
    const desc = req.body.description;
    const author = req.body.author;
    const id = req.body._id;

    db.connect(function (err) {
        if (err) throw (err)

        var myQuery = {
            _id: id
        };

        var newValues = {
            $set: {
                name: name,
                description: desc,
                author: author
            }
        };

        db.db("TutorialDB").collection("blogs").updateOne(myQuery, newValues, function (err, res) {
            if (err) throw (err)

            console.log("1 document updated");
            db.close();
        });
    });
    res.render("blog");
});

router.post('/delete', function (req, res) {
    const name = req.body.name;

    db.connect(function (err) {
        if (err) throw (err)

        var myQuery = {
            name: name
        }

        db.db("TutorialDB").collection("blogs").deleteOne(myQuery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
            res.render("blog");
        });
    });
});

module.exports = router