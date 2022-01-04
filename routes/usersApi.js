var express = require('express');
var router = express.Router();

let usersDB = require ('../models/users-delete')


/* GET home page. */
router.get('/email/:email', function(req, res, next) {
    // check if email exists already
    res.send({user: usersDB.get(req.params.email) != null});
});


module.exports = router;