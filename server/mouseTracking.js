Meteor.methods({
ip_address: function(){
  		return this.connection.clientAddress;
},
getmouses:function(ip,obj){
	var ip = this.connection.clientAddress;
 	return userTracking.insert(obj);
},
deletemouse:function(id){
	return userTracking.remove({_id:id});
}

})
