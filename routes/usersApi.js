var express = require('express');
var router = express.Router();

let db = require ('../models')


/* GET home page. */
router.get('/email/:email', function(req, res, next) {
    return db.User.findOne({where: {email: req.params.email}})
        .then((u) => {
            if (u) {
                res.json({user:u.email})
            } else {
                res.json({error: 'User not found'})
            }
        })
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            return res.send(err)
        });
});


module.exports = router;