Meteor.methods({
	editForum: function(id,obj){
		return posts.update({_id:id},{$set:obj});
	}
});