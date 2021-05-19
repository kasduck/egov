const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
var User = require('../models/user.js');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './public/docs/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('myDoc');
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /pdf|docx|doc|odt/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Docs Only!');
    }
  }

router.get('/my_docs',(req,res)=>{
    if(!req.session.isLoggedIn){
        res.redirect('/index');
      }
      User.find({name: req.session.name}).then((user) => {
        res.render('my_docs',{
        msg:"",
        files: user[0].files,
        csrfToken: req.csrfToken()
        })
        const x = JSON.parse(JSON.stringify(user[0].files));
        console.log("-----------------------------");
        console.log(x);
        console.log("-----------------------------");
      }).catch(err => {
                console.log('Error is ', err.message);
              });
})
router.post('/upload_doc',(req,res) => {
    upload(req, res, (err) => {
        if (err) {
          User.find({name: req.session.name}).then((user) => {
            res.render('my_docs',{
            msg:"Not Uploaded",
            files: user[0].files,
            csrfToken: req.csrfToken()
            })}).catch(err => {
                console.log('Error is ', err.message);
              });
        } else {
          if (req.file == undefined) {
            User.find({name: req.session.name}).then((user) => {
                res.render('my_docs',{
                msg:"No File Selected",
                files: user[0].files,
                csrfToken: req.csrfToken()
                })}).catch(err => {
                    console.log('Error is ', err.message);
                  });
          } else {
            User.updateOne({ name: req.session.name},{ $push: { files: {path: req.file.filename, name: req.body.name }}})
              .then((user) => {
                for(let i=0;i <1000;i++);
              })
              .catch(err => {
                console.log('Error is ', err.message);
              })
              for(let i=0;i <1000;i++);
              User.find({name: req.session.name}).then((user) => {
                res.render('my_docs',{
                msg:"File Uploaded",
                files: user[0].files,
                csrfToken: req.csrfToken()
                })}).catch(err => {
                    console.log('Error is ', err.message);
                  });
          }
        }
      });
})
router.post('/download',(req,res,next) => {
  console.log("...............................................................................");
  let location = __dirname + "/../public/docs/" + req.body.loc;
  console.log(location);
  console.log("...............................................................................");
  fs.readFile(location,(err,data) => {
    if(!err){
      res.send(data);
    }
  });
});
router.post('/delete',(req,res,next) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  console.log("...............................................................................");
  let location = __dirname + "/../public/docs/" + req.body.loc;
  console.log(obj);
  console.log("...............................................................................");
  // fs.unlink(location,(err)=>{
  //   if(err){
  //     console.log(err);
  //   }
  // });
  User.updateOne({ name: req.session.name},{ $pull: { files: {path: obj.loc}}},
    {safe: true, upsert: true},
    function(err, doc) {
        if(err){
        console.log(err);
        }else{
        //do stuff
        }
    });
    for(let i=0;i <1000;i++);
    res.redirect('/my_docs');
});
module.exports = router;