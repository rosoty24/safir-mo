Template.contennews.events({
	"click #remove": function(e, tpl) {
		//alert("hellllll");
		var id=this._id;
		Meteor.call('deletePostt', id);
	}
});
Template.contennews.helpers({
	newstpost: function(){
		var userlogin = Meteor.userId();
		var result = contents.find({author:userlogin});
		var result = contents.find({type:{$ne:"Tuto"}});
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
