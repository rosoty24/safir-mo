Template.addPost.events({
	'submit form': function(e,tpl){
		e.preventDefault();
		var id = Meteor.userId();
		var topic = $('#topic').val();
		var description = $('#description').val();
		/*var d = new Date();
		var date = d.getDate();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		var time = date+"-"+month+"-"+year;*/
    var time = new Date();
		var image = Session.get("ADDIMAGEID");
		var parent_id = "0";
    var category = $('#category').val();
		if(Meteor.user()){
			Meteor.call('addPost', id,parent_id,topic,description,image,time,category, function(err){
				if(err){
					console.log(err.reason);
				}else{
					console.log("Success");
          Router.go('/forum/listing');
				}
			});
		}else{
			Router.go("/login");
		}
	
	},
	  'change #image': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
       // alert("sess"+fileObj._id)
        Session.set('ADDIMAGEID', fileObj._id);
      });
    }
  },
  
});

Template.forumDetail.events({
    'submit form': function(e,tpl){
    e.preventDefault();
    var userid = Meteor.userId();
    var description = $('#description').val();
    var d = new Date();
    var date = d.getDate();
    var year = d.getFullYear();
    var month = d.getMonth()+1;
    var time = date+"-"+month+"-"+year;
    var id = this._id;
    var forum = posts.findOne({_id:id});
    var categoryid = (forum)? forum.category:'';
    var image = Session.get("ADDIMAGEID");
    Meteor.call('addReply', userid,id,description,categoryid,time,image,status, function(err){
      if(err){
        console.log(err.reason);
      }else{
        console.log("Success");
         Router.go('/forum/listing');
      }
    });
  },
    'change #image': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
       // alert("sess"+fileObj._id)
        Session.set('ADDIMAGEID', fileObj._id);
      });
    }
  }
});

Template.addPost.onRendered( function() {
 $( "#addPost" ).validate({
    rules: {
      topic: {
        required: true
      },
      description: {
        required: true
      }
    },
    messages: {
      topic: {
        required: "<p style='color:#FF0000;'>Please enter your forum topic!</p>"
      },
      description: {
        required: "<p style='color:#FF0000;'>Please enter your forum description!</p>"
      }
    }
  });
});

Template.reply.onRendered( function() {
 $( "#addReply" ).validate({
    rules: {
      topic: {
        required: true
      },
      description: {
        required: true
      }
    },
    messages: {
      topic: {
        required: "<p style='color:#FF0000;'>Please enter your forum topic!</p>"
      },
      description: {
        required: "<p style='color:#FF0000;'>Please enter your forum description!</p>"
      }
    }
  });
});

Template.addPost.helpers({
    listCategories: function(){
        return categories.find({});
    }
});

Template.forumDetail.events({
  'click #reply': function(){
      $("#form").css("visibility","visible");
  }
});