Template.updateForum.helpers({
	updateForum: function(){
		return posts.find({});
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
    listCategories: function(){
    	return categories.find({});
    }
});

Template.updateForum.events({
	'click #update': function(e,tpl){
		e.preventDefault();
		var id = this._id;
		var topic = tpl.$("#topic").val();
		var description = tpl.$("#description").val();
		var obj = posts.findOne(id);
		var oldimage = obj.image;
		var parent = obj.parentId;
		var userId = obj.userId;
		var categories = $("#category").val();
		alert(categories);
		var image = Session.get('UPDATEIMAGEID');
		if( image.length > 0 ){
			for( i=0; i < image.length; i++){
				oldimage.push(image[i]);
			}
		}
		var obj ={topic:topic,description:description,category:categories,image:oldimage,parentId:parent,userId:userId};
		Meteor.call("editForum",id,obj, function(err){
			if(err){
				alert(err.reason);
			}else{
				alert("Success");
				Session.set('UPDATEIMAGEID',[])
			}
		});
	},
	'change #image': function(event, template) {
    	var files = event.target.files;
    	var image = [];
    	for (var i = 0, ln = files.length; i < ln; i++) {
      		var id = images.insert(files[i], function (err, fileObj) {
        	// Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      		});
      		image.push(id._id);
    	}
    	Session.set('UPDATEIMAGEID', image);
    	
  }
});
