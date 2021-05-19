const express = require('express');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var User = require('../models/user.js');
const saltRounds = 10;
const router = express.Router();

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
  }

router.post('/login', (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log(obj);
    req.session.name = obj.name;
    req.session.isLoggedIn = false;
    User.find({ name: obj.name, password: obj.password })
      .then((user) => {
        if (user.length == 0) {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(obj.password, salt, function(err, hash) {
              var user = new User({
                name: obj.name,
                password: hash,
                img: '',
                pic1:'',
                pic2:'',
                pic3:'',
                pic4:'',
                pic5:''
              });
              user.save();
            });
        });
          res.render('img1', {
            msg: 'Data Uploaded!',
            vis1: 'show',
            csrfToken: req.csrfToken()
            // file: `uploads/${req.file.filename}`
          });
        }
        else {
          res.render('index', {
            msg: 'Data Not Uploaded!',
            vis1:'hide',
            csrfToken: req.csrfToken()
            // file: `uploads/${req.file.filename}`
          });
        }
      })
      .catch((err) => console.log('Error is ', err.message));
      
  });
  router.get('/welcome',(req,res,next)=>{
    res.render('form',{csrfToken: req.csrfToken()});
  })
  router.post('/signin',(req,res,next)=>{
    name = req.body.name;
    a=[];
    const testFolder = './public/uploads';
    const fs = require('fs');
  
    var files = fs.readdirSync(testFolder);
    console.log(files);
    for (i = 0; i < 5; i++) {
      a[i]=randomInt(0, 100);
    }
    const obj = JSON.parse(JSON.stringify(req.body))
    User.find({ name: obj.name})
      .then((user) => {
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
          if (result == true) {
            req.session.name = user[0].name;
            req.session.isLoggedIn = false;
            console.log(user);
            res.render('signin', {
              file1: files[a[0]],
              file2: files[a[1]],
              file3: files[a[2]],
              file4: files[a[3]],
              file5: files[a[4]],
              file6: user[0].pic1,
              file7: user[0].pic2,
              file8: user[0].pic3,
              file9: user[0].pic4,
              file10: user[0].pic5,
              csrfToken: req.csrfToken()
            })
          }
          else {
            res.render('index',{csrfToken: req.csrfToken()});
          }
        })
        .catch(err => {
          console.log('Error is ', err.message);
        })
      });
    })
    router.post('/auth',(req,res,next)=>{
      const obj = JSON.parse(JSON.stringify(req.body))
        console.log(obj);
      if (obj.file6 == "true" && obj.file7 == "true" && obj.file8 == "true" && obj.file9 == "true" && obj.file10 == "true" && obj.file1 != "true" && obj.file2 != "true" && obj.file3 != "true" && obj.file4 != "true" && obj.file5 != "true"){
        req.session.isLoggedIn = true;
        res.redirect('/home');
    }
      else{
        res.render('form',{csrfToken: req.csrfToken()});
      }
      
    });
    router.get('/news',(req,res,next) => {
      if(!req.session.isLoggedIn){
        res.redirect('/index');
      }
        res.render('news',{csrfToken: req.csrfToken()});
        
    })
module.exports = router;