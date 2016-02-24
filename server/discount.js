Meteor.methods({
  insertProDiscount:function(obj){
    discount.insert(obj);
  },
  deletediscount: function(id){
		discount.remove(id);
	},
	updateProDiscount: function(id,obj) {
		discount.update({_id:id},{$set: obj});
	}
});