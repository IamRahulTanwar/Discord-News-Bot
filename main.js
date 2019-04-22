const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
const routes = require('./routes');
const token = config.token;
const prefix = config.prefix;
const server = require('./handlers/server');
const fs = require('./handlers/filehandlers');

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var objectPath = require("object-path");
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.set('view engine', 'ejs');


var path = require('path');


//Contianer for main file

var main = {};

main.init = function(){
client.on('ready', () => {
  console.log(`Bot logged in`);

});

client.on('message', msg => {
  routes.init(msg,function(result){
     
    msg.author.send(result);
    
  });
});


client.login(token);

//Server Connection
    app.listen(4444, () => {
        console.log('\x1b[35m%s\x1b[0m', 'Server started on port ' + 4444 + '.');
    });
};

main.sendMessage = function(news){

fs.read('users',function(err,data){

    if(!err){

      for(var x in data.channel.list){
          console.log(data.channel.list[x]);
          client.channels.get(data.channel.list[x]).send(news);

        } 

    }else{

      console.log("Error in sending msgs");
    }

  });

};

//home



//add news
app.post('/post/news', (req, res) => {

    fs.read('news', function (err, data) {

          var _news = req.body.news;


            if (!err) {

              
                objectPath.push(data, 'news.list',_news);
                
                fs.update('news', data, function (err) {

                  if (!err) {

                    console.log("Updated");

                    res.send("Message Sent");
                    

                    fs.read('channel',function(err,data){

                      if(!err){

                        for(var x in data.channel.list){
                          console.log(data.channel.list[x]);
                          client.channels.get(data.channel.list[x]).send(_news);

                        } 

                      }else{

                        console.log("Error in reading file")
                      }

                    });
                
                  } else {

                      console.log("Error");
                    }

                });

              }else{

                callback("Channel Already Registered");
              }

            


          });



});

//Exporting module 
module.exports = main;






