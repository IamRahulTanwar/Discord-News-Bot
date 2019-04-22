//Dependencies
const fs = require('./filehandlers');
var objectPath = require("object-path");


//Container for methods

var methods = {};

methods.ping = function(msg,callback){

  callback("Pong");

  console.log(msg);

};

methods.db = function(msg,callback){

  fs.read('users',function(err,data){

    if(!err){

      callback("File Read");
      console.log(JSON.stringify(data));

    }else{

      callback("DB Error");
    }

  });


};

methods.registerChannel = function(msg,callback){


    if(msg.guild.ownerID===msg.author.id){


        fs.read('channel', function (err, data) {


            if (!err) {

              var check = false;
              
               for(var x in data.channel.list){
                 console.log(data.channel.list[x]);
                 if(data.channel.list[x]===msg.channel.id){
                   check = true;
                 }
               } 
              
              if(!check){
                objectPath.push(data, 'channel.list', msg.channel.id);
                
                fs.update('channel', data, function (err) {

                  if (!err) {

                    callback("Channel Registered Successfully");

                  } else {

                    callback("Error in registration , plz try after sometime");
                  }

                });

              }else{

                callback("Channel Already Registered");
              }

            } else {

              callback(true, "Error in reading file");
            }


          });

    }else{

        callback("You are not authorized to do this");
    }


};



module.exports = methods;