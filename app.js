const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const csrf = require('csurf');
var cookieParser = require('cookie-parser')
const fileupload = require("express-fileupload");
const upload_routes = require('./routes/upload_routes');
const auth_routes = require('./routes/auth_routes');
const content_management_routes = require('./routes/content_management_routes.js');
const { nextTick } = require('process');

var MONGO_URI = "mongodb+srv://tej:tpa4401@first-bvv78.gcp.mongodb.net/school?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DATABASE connected Properly!'))
  .catch((err) => console.log('Error is ', err.message));

// Init app
const csrfProtection = csrf({ cookie: true });
const app = express();
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json());
  // app.use(fileupload({
  //   limits: { fileSize: 500 * 1024 },
  //   useTempFiles: true,
  //   tempFileDir: './resources/static/img/'
  // }));
// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret:'7g3f9q80hfj10b8hf3b12n08b1cbeu3',resave:false, saveUninitialized:false, cookie:{ }}));
app.use(csrfProtection);
app.get('/index', (req, res,next) => {
  res.render('index', { csrfToken: req.csrfToken() });
  next();
});
app.use(auth_routes);
app.use(upload_routes);
app.use(content_management_routes);
app.get('/home', (req, res) =>  res.render('home', { csrfToken: req.csrfToken() }));
app.get('/logout',function(req,res){
  req.session.destroy(function(err){
      if(err){
          console.log(err);
      }
      else
      {
          res.redirect('/index');
      }
  });

});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));