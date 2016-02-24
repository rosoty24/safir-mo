Meteor.methods({
	addReply: function(id,parent_id,description,categoryid,time,image,status) {
		var attr={
			userId:id,
			parentId:parent_id,
			description:description,
			category:categoryid,
			date: time,
			image:[{image}]
		}
		return posts.insert(attr);
	}
});