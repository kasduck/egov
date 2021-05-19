const express = require('express');
const multer = require('multer');
const path = require('path');
var User = require('../models/user.js');

const router = express.Router();

var n;
var p;
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
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
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

router.post('/upload',(req,res) => {
    upload(req, res, (err) => {
      if (err) {
        res.render('index', {
          msg: err,
          vis1:'hide',
          csrfToken: req.csrfToken()
        });
      } else {
        if (req.file == undefined) {
          res.render('index', {
            msg: 'Error: No File Selected!',
            vis1:'hide',
            csrfToken: req.csrfToken()
          });
        } else {
          
          var update = { pic1: req.file.filename}
          console.log(req.file.filename);
          User.updateOne({ name: req.session.name, }, update)
            .then((profile) => {
              // console.log(profile)
            })
            
            .catch(err => {
              console.log('Error is ', err.message);
            })
          res.render('img2', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`,
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
        }
      }
    });
  });
  router.post('/upload2', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.render('index', {
          msg: err,
          vis1: 'hide',
          csrfToken: req.csrfToken()
        });
      } else {
        if (req.file == undefined) {
          res.render('index', {
            msg: 'Error: No File Selected!',
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
        } else {
          res.render('img3', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`,
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
          console.log(req.file.filename);
          var update = { pic2: req.file.filename }
          User.updateOne({ name: req.session.name, }, update)
            .then((profile) => {
              // console.log(profile)
            })
            .catch(err => {
              console.log('Error is ', err.message);
            })
        }
      }
    });
  });
  router.post('/upload3', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.render('index', {
          msg: err,
          vis1: 'hide'
        });
      } else {
        if (req.file == undefined) {
          res.render('index', {
            msg: 'Error: No File Selected!',
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
        } else {
          res.render('img4', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`,
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
          var update = { pic3: req.file.filename }
          User.updateOne({ name: req.session.name, }, update)
            .then((profile) => {
              // console.log(profile)
            })
            .catch(err => {
              console.log('Error is ', err.message);
            })
        }
      }
    });
  });
  router.post('/upload4', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.render('index', {
          msg: err,
          vis1: 'hide',
          csrfToken: req.csrfToken()
        });
      } else {
        if (req.file == undefined) {
          res.render('index', {
            msg: 'Error: No File Selected!',
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
        } else {
          res.render('img5', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`,
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
          var update = { pic4: req.file.filename }
          User.updateOne({ name: req.session.name }, update)
            .then((profile) => {
              // console.log(profile)
            })
            .catch(err => {
              console.log('Error is ', err.message);
            })
        }
      }
    });
  });
  router.post('/upload5', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.render('index', {
          msg: err,
          vis1: 'hide',
          csrfToken: req.csrfToken()
        });
      } else {
        if (req.file == undefined) {
          res.render('index', {
            msg: 'Error: No File Selected!',
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
        } else {
          res.render('index', {
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`,
            vis1: 'hide',
            csrfToken: req.csrfToken()
          });
          var update = { pic5: req.file.filename}
          User.updateOne({ name: req.session.name }, update)
            .then((profile) => {
              // console.log(profile)
            })
            .catch(err => {
              console.log('Error is ', err.message);
            })
        }
      }
    });
  });
module.exports = router;