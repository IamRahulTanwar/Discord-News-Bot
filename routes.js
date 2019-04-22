//Dependencies
const helper = require('./handlers/helper')
const methods = require('./handlers/method');
//Container for commands

var routes = {};


var m = {
  "-ping":methods.ping,
  "-db":methods.db,
  "-register":methods.registerChannel
  
};



routes.init = function(msg,callback){
  var c ;
  helper.split(msg,function(result){
    c = result;
  });

  for(var key in m){

      if(`-${c[1]}`===key){
        m[key](msg,function(result){
            callback(result);
        });
      }
  }
};

//Exporting module
module.exports = routes;