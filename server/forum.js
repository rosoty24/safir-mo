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
	},
	addReply: function(id,parent_id,topic,description,categoryid,time,image,status) {
		var attr={
			userId:id,
			parentId:parent_id,
			topic:topic,
			description:description,
			category:categoryid,
			date: time,
			image:[{image}]
		}
		return posts.insert(attr);
	},
	updateForum:function(id,userid,parent_id,topic,description,image,time,categoryid){
		var attr={
			userId:userid,
			parentId:parent_id,
			topic:topic,
			description:description,
			category:categoryid,
			date: time,
			image:[{image}],
		}
		posts.update({_id:id},{$set:attr});
	}
});