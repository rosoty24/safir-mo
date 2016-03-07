Session.set('ADDIMAGEID','');
Template.addPost.events({
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
  'click #image': function(){
    imgBrowse1 = $("input[id='images']").click().val();
  },
  'click #images': function(){
    imgBrowse1 = $("input[id='image']").click().val();
  },
	'click #addPost': function(e,tpl){
		e.preventDefault();
		var id = Meteor.userId();
		var topic = $('#topic').val();
		var description = $('#description').val();
        var time = new Date();
		var image = Session.get("ADDIMAGEID");
        console.log("image: "+image);
		var parent_id = "0";
        var category = Session.get("CATEGORYID");
        if (category == "" || category == null) {
          Bert.alert( 'Please choose topic', 'danger', 'growl-top-right' );
        }
        else if(topic == "" || topic == null) {
          Bert.alert( 'Please input topic', 'danger', 'growl-top-right' );
        }
        else if (description == "" || description == null) {
          Bert.alert( 'Please input description', 'danger', 'growl-top-right' );
        }
        else if (image == "" || image == null) {
          Bert.alert( 'Please choose image', 'danger', 'growl-top-right' );
        }
		else{
            if(Meteor.user()){
                Meteor.call('addPost', id,parent_id,topic,description,image,time,category, function(err){
                    if(err){
                        console.log(err.reason);
                    }else{
                        Bert.alert( 'success', 'success', 'growl-top-right' ); 
                        Router.go('/forum/myforum');
                    }
                });
            }else{
                Router.go("/login");
            }
        }
	
	},
	'change #image': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
            images.insert(files[i], function (err, fileObj) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                //alert("sess"+fileObj._id)
                Session.set('ADDIMAGEID', fileObj._id);
            });
        }
    }
});
Template.forumDetail.events({
    'click .li-reply':function(e,tpl){
        e.preventDefault();
        tpl.$(".reply").removeClass("hidden");
    },
    'click .btn-send': function(e,tpl){
        var userid = Meteor.userId();
        var description = $('#description').val();
        var time = new Date();
        var id = this._id;
        var forum = posts.findOne({_id:id});
        var categoryid = (forum)? forum.category:'';
        var topic = (forum)? forum.topic:'';
        var image = Session.get("ADDIMAGEID");
        if(description=='' || description==null){
            tpl.$(".error").removeClass("hidden");
        }else{
            Meteor.call('addReply', userid,id,topic,description,categoryid,time,image,status, function(err){
                if(err){
                    console.log(err.reason);
                }else{
                    console.log("Success");
                    Router.go('/forum/listing');
                }
            });
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
    },
    getprofile:function(){
        var id = Meteor.userId();
        var result = Meteor.users.findOne({_id:id});
        console.log("my user ============="+result);
        return result;
    }
});

Template.forumDetail.events({
  'click #reply': function(){
      $("#form").css("visibility","visible");
  }
});