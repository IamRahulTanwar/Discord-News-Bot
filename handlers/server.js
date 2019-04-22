// Dependencies
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var objectPath = require("object-path");
const main = require('../main');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.set('view engine', 'ejs');


var path = require('path');


const fs = require('./filehandlers');



// Container for server 
var server = {};

server.init = function () {


    //Server Connection
    app.listen(4444, () => {
        console.log('\x1b[35m%s\x1b[0m', 'Server started on port ' + 4444 + '.');
    });



}




//create file 
app.post('/post/news', (req, res) => {

    fs.read('news', function (err, data) {

          var _news = req.body.news;


            if (!err) {

              
                objectPath.push(data, 'news.list',_news);
                
                fs.update('news', data, function (err) {

                  if (!err) {

                    console.log("Updated");
                    main.sendMessage(_news);
                  } else {

                      console.log("Error");
                    }

                });

              }else{

                callback("Channel Already Registered");
              }

            


          });



});




//Export the module 
module.exports = server;