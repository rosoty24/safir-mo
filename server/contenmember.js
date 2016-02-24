Meteor.methods({
	updatecontentPost: function(id,attr) {
		contents.update({_id:id},{$set: attr});
	},
	deletePostt : function(id) {
		contents.remove(id);
	}

});