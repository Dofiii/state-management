'use strict';
const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;

const username = 'foo';
const password = 'bar';

app.use(session({
  secret: 'salainen kissa',
  resave: false,
  saveUnitialized: true,
}))

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr).send('cookie set');
});

app.get/'/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('cookie color cleared');
}

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if(req.session.logged){
    res.render('secret');
  } else {
    res.redirect('/form');
  }
});

app.post('/login', (req, res) => {
  if(username === req.body.username && password === req.body.password){
    req.session.logged = true;
    res.redirect('/secret');
  } else {
    req.session.logged = false;
    res.redirect('/form');
  }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 