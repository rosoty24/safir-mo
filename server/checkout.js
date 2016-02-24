Meteor.methods({
// shop 
  insertCart: function(obj){
    order.insert(obj);
  },
 removemycheckout: function(id){
		cart.remove(id);
	}
  
});
