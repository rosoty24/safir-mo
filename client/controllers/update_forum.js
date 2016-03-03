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
    },
    getprofile:function(){
        var id = Meteor.userId();
        var result = Meteor.users.findOne({_id:id});
        console.log("my user ============="+result);
        return result;
    },
    getCategoryName:function(id){
    	var result = categories.findOne({_id:id});
    	var a = result.title;
    	console.log("MY CATEGORY NAME IS==========="+a);
    	return a;
    }
});

Template.updateForum.events({
		"click #makeup":function(){
	    $("#panel_makeup").slideToggle("slow");
	    $("#panel_all_makeup").hide();
	  },
	  "click #all_makeup":function(){
	    $("#panel_all_makeup").slideToggle("slow");
	    $("#panel_makeup").hide();
	  },
	'click #category':function(e){
    var catName = $(e.currentTarget).text();
    var id = this._id;
    Session.set("CATEGORYID" , id);
    $("#topicName").html(catName);
    $("#panel_makeup").slideToggle("hide");
    //console.log("cat is ====="+id);
  },
  'click #images': function(){
    imgBrowse1 = $("input[id='image']").click().val();
  },
	'click #update': function(e,tpl){
		//alert('ok');
		var id = this._id;
		var topic = tpl.$("#topic").val();
		var description = tpl.$("#description").val();
		var obj = posts.findOne(id);
		var oldimage = obj.image;
		var parent = obj.parentId;
		var userId = obj.userId;
		var category = Session.get("CATEGORYID");
		var image = Session.get('UPDATEIMAGEID');
		if( image.length > 0 ){
			for( i=0; i < image.length; i++){
				oldimage.push(image[i]);
			}
		}
		console.log("MY CONSOLT======="+image);
		var obj ={
			topic:topic,
			description:description,
			category:category,
			image:oldimage,
			parentId:parent,
			userId:userId
		};
		Meteor.call("editForum",id,obj, function(err){
			if(err){
				alert(err.reason);
			}else{
				Bert.alert( 'success', 'success', 'growl-top-right' ); 
				Router.go('/forum/myforum');
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
