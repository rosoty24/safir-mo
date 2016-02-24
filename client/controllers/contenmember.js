Template.contenmember.helpers({
	contentpost: function(id){
		var userlogin = Meteor.userId();
		var result = contents.find({author:userlogin});
		return result;
	},
	getImage: function(id){
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	},
	typeName: function(nametype){
		var typeresult = contents_type.findOne({_id:nametype});
		return typeresult.type;
	}
});
Template.contenmember.events({
	"click #remove": function(e, tpl) {
		//alert("hellllll");
		var id=this._id;
		Meteor.call('deletePostt', id);
	}
});