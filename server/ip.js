Meteor.methods({
  ip:function(){
    
     var ip= Meteor.onConnection.clientAddress;
     console.log(ip);
     return ip;
  }
});