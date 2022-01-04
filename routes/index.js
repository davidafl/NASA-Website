var express = require('express');
const Cookies = require('cookies')
var router = express.Router();

// Optionally define keys to sign cookie values
// to prevent client tampering
const keys = ['foobar']

let usersDB = require ('../models/users-delete')
let User = require('../models/user-delete')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: '' });
});

router.post('/register', function(req, res, next) {
  res.render('register', { title: '' });
});

router.get('/register2', function(req, res, next) {
  res.redirect("/register")
});

router.post('/register2', function(req, res, next) {
  // set a cookie to timeout registration after 60 seconds
  const cookies = new Cookies(req, res, { keys: keys })
  cookies.set('startRegistration', new Date().toISOString(), { signed: true, maxAge: 10*1000 });
  res.render('register2', { title: '', email: req.body.email, firstName: req.body.firstName,lastName: req.body.lastName });
});

router.get('/register3', function(req, res, next) {
  res.redirect("/register")
});

router.post('/register3', function(req, res, next) {
  const cookies = new Cookies(req, res, { keys: keys })
  if (cookies.get("startRegistration")) {
    let user = new User(req.body.email,req.body.firstName,req.body.lastName, req.body.password)
    usersDB.set(user.email,user);
    //req.session.tempUser = null; // clear session
    //console.log(usersDB);
    res.render('index', { title: 'Registration Successful, Please Login' });
  }
  else {
    // timeout
    res.render('register', { title: 'Registration Failed, try again (faster ;)' });
  }

});

router.get('/allusers', function(req, res, next) {
  res.send(...usersDB.entries());
});

module.exports = router;