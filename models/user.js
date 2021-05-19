var mongoose = require('mongoose');
var User = mongoose.Schema(
    {
        img:
            { data: Buffer, contentType: String },
        name:String,
        password:String,
        pic1:String,
        pic2: String,
        pic3: String,
        pic4: String,
        pic5: String,
        files: [{path: String, name: String}]
    }
);
module.exports = mongoose.model('User', User)