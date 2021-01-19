const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nattapong:<password>.@sandbox.2ng5o.mongodb.net/Sandbox?retryWrites=true&w=majority";
const db = new MongoClient(uri, { useNewUrlParser: true });

router.post('/', function (req, res) {
    const collection_name = req.body.collection_name;
    const author_id = req.body.author_id;
    const author_name = req.body.author_name;
    const author_age = req.body.author_age;
    const author_contact = req.body.author_contact;

    db.connect(function (err) {
        // if (err) console.log(err);÷

        db.db('TutorialDB').createCollection(collection_name).then(err => {
            // if (err) console.log(err);

            const insertObj = {
                author_id: author_id,
                author_name: author_name,
                author_age: author_age,
                author_contact: author_contact
            }

            db.db('TutorialDB').collection(collection_name).insertOne(insertObj, function (err) {
                // if (err) console.log(err);

                console.log('> 1 Collection created!');
                db.close();
                res.redirect('/');
            });
        });
    });
});

module.exports = router;