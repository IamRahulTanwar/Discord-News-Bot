//Container for helper

var helper = {};

helper.split = function(msg,callback){
  var cmd = msg.content.trim();
  var res = new Array();
   res = cmd.split('-');
   var i =0;
   for(var x of res){
     res[i] = x.trim();
      i++;
   }
   
  callback(res);
};

//Exporting Module
module.exports = helper;