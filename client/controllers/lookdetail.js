Template.lookdetail.helpers({
	getImage: function(id){
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	},
	getAuthor: function(id){
		return Meteor.users.findOne({_id:id})
	}
});
