var express = require('express');
const Cookies = require('cookies')
var router = express.Router();

// Optionally define keys to sign cookie values
// to prevent client tampering
const keys = ['foobar']

let db = require ('../models')

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
    const { email, firstName, lastName, password } = req.body;
    return db.User.create({firstName,lastName,email,password})
        .then((contact) => {
          res.render('index', { title: 'Registration Successful, Please Login' });
        })
        .catch((err) => {
          console.log('*** error creating a contact', JSON.stringify(contact))
          res.render('index', { title: 'Registration Failed, Please Try Again' });
          //return res.status(400).send(err)
        })
  }
  else {
    // timeout
    res.render('register', { title: 'Registration Failed, try again (faster ;)' });
  }

});

router.get('/login', function(req, res, next) {
  if (req.user) {
    res.redirect('/ex3')
  }
  else {
    res.redirect("/");
  }
});

router.post('/login', function(req, res, next) {
  const { email, password } = req.body;
  db.User.findOne({where: {email, password}})
    .then((user) => {
      if (user) {
        req.session.user = user;
        res.render('ex3', { title: 'Login Successful' });
      }
      else {
        res.render('index', { title: 'Login Failed' });
      }
    })
    .catch((err) => {
      res.render('index', { title: 'Login Failed' });
    })
});

router.get('/ex3', function(req, res, next) {
  if (req.user) {
    res.render('ex3', { title: '' });
  }
  else {
    res.redirect("/");
  }
});

router.get('/allusers', (req, res) => {
  return db.User.findAll()
      .then((alldata) =>
      {
        res.send(alldata)
      })
      .catch((err) => {
        console.log('error', JSON.stringify(err))
        return res.send({message: err})
      });
})

module.exports = router;