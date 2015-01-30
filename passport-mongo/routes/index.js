module.exports = function(passport){
  var express = require('express');
  var router = express.Router();
  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index');
  });
 
  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    
  }));
 
  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register');
  });
 
  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
     
  }));
  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    else 
      res.redirect('/');
  }  
  router.get('/home', isAuthenticated, function(req, res){
    
    res.render('home', { user: req.user });
  });
  
  return router;
}