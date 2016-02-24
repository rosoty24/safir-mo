Template.details.events({
		'submit form': function(e, tpl){
		e.preventDefault();
		var userid=Meteor.userId();
		if(userid==null){
			alert("You have to be logged to submit a review!");
			return;
		}
		var title=tpl.$("#title").val();
		var text=tpl.$("#comment").val();
		var grade=tpl.$("#sel1").val();
		$("#bt_review").click();
		Meteor.call('addReview',title,text,grade,userid,this._id);
		/*alert("Review added successfully!")*/
	}
	
});
Template.addreview.events({
	'click #bt_review': function(e,tpl){
		if(tpl.$("#add_review").css("display")=='none')
			tpl.$("#add_review").css("display","block");
		else
			tpl.$("#add_review").css("display",'none');
	}
})

Template.addreview.helpers({
	getImgUrl: function(userid){
		console.log('avatar='+userid);
		var user=users.findOne({"_id":userid});
		if(!user.hasOwnProperty('image'))
            return 'unknown.png';
		var img = images.findOne({_id:user.image});
            console.log("current img="+img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
	}
});


/*Template.review.helpers({
	userAvatar:function(user){
		var u=users.findOne({"_id":user});
		console.log('DJIBIMAG='+user);
		return u.image;
	},
	getUsername: function(userid){
		//Meteor.subscribe("users",userid);
		return users.findOne({_id:userid}).username;
	},
	getImgUrl: function(){
		console.log('avatar='+userid);
		var user=users.findOne({"_id":userId()});
		if(!user.hasOwnProperty('image'))
            return 'unknown.png';
		var img = images.findOne({_id:user.image});
            console.log("current img="+img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
	}
});*/

Template.review.helpers({
	getUsername: function(userid){
		return users.findOne({_id:userid}).emails[0].address;
	},
	getImgUrl: function(userid){
		console.log('avatar='+userid);
		var user=users.findOne({"_id":userid});
		if(!user.hasOwnProperty('image'))
            return 'unknown.png';
		var img = images.findOne({_id:user.image});
            console.log("current img="+img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
	},
	getImageUser:function(userId){
		//alert(userId);
		
		Meteor.call('getUserReview',userId,function(err,value){
			if(err){
				alert(err);
			}else{
				
				$('.'+value._id).text(value.profile.firstname);
				
			}
		});
	},
	getImages:function(userId){
		
		Meteor.call('getUserReview',userId,function(err,value){
			if(err){
				alert(err);
			}else{
				//makara
				var id=value.image;
				if(id=='' || typeof id == "undefined")
            	$('.image'+value._id).attr('src', '/img/unknown.png');

		        else if(id.indexOf("uploads")>-1){
		            id=id.replace(/ /g, "%20");
		            console.log('repaclement===='+id);
		            path = id.replace('/uploads/images/','');
	
		            $('.image'+value._id).attr('src','http://d1ak0tqynavn2m.cloudfront.net/'+path);
		            //return id;
		        }
		        else if(id.indexOf("http://")>-1 || id.indexOf("https://")>-1 ){
		            $('.image'+value._id).attr('src', id);

		        }else{
		            var img = images.findOne({_id:id});
		            if(img){
		                var id= img.copies.images.key;
		                console.log("id img---" + id);
		                path=id.replace('UserUploads/','');
		                console.log("path "+path);
		                $('.image'+value._id).attr('src', 'http://d2l5w8pvs4gpu2.cloudfront.net/'+path);
		            }
		        }
				//end makara
				
				
			}
		});
	}
});
