Meteor.methods({
	addPost: function(id,parent_id,topic,description,image,time,categoryid) {
		var attr={
			userId:id,
			parentId:parent_id,
			topic:topic,
			description:description,
			category:categoryid,
			date: time,
			image:[{image}],
		}
		return posts.insert(attr);
	},
	deleteForum: function(id,user_id){
		return posts.remove(id);
	}
});