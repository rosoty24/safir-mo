Meteor.methods({
	Updatecollect:function(id,obj){
		collect.update({_id:id},{$set:obj});
	},
	deleteCollect: function(id){
		collect.remove(id);
	}
});