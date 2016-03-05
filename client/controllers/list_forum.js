Session.set('loadlimit',20);
var processScroll = true;
$(window).scroll(function() {
    if (processScroll  && $(window).scrollTop() > $(document).height() - $(window).height() - 100) {
        processScroll = false;
    var oldLimit=Session.get('loadlimit');
    oldLimit+=10;
    Session.set('loadlimit',oldLimit);
    processScroll = true;
}
});
Template.listForum.onRendered(function(){
    $(document).ready(function() {
        $(".u-vmenu").vmenuModule({
            Speed: 200,
            autostart: false,
            autohide: true
        });
    });
});
Template.listForum.events({
    "click #makeup":function(){
        $("#panel_makeup").slideToggle("slow");
    },
    "click #child_cate":function(e,tpl){
        var catId = this._id;
        Session.set("CATEID",catId);
        var cateName = tpl.$(e.currentTarget).attr("data-cate");
        tpl.$("#cate").html(cateName);
        $("#panel_makeup").hide();
    }
});
//list forum
Template.listForum.helpers({
    getAllCate:function(){
        return categories.find();
    },
    allForums: function(){
        //return posts.find({});
        return posts.find({parentId:"0"},{limit:Session.get('loadlimit')});
    },
    getallForum: function(){
        //return posts.find({},{limit:Session.get('loadlimit')});
        var item = Session.get("CATEID");
        if(item){
            return posts.find({category:item},{limit:Session.get('loadlimit')});
        }
        else{
            return posts.find({},{limit:Session.get('loadlimit')});
        }
    },
    getprofile:function( userId ){
        var user = Meteor.users.findOne({_id:userId});
        //return user.profile.firstname;
        return user;
    },
    getImage: function(id){
            var img = images.findOne({_id:id});
            console.log(img);
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }
            else{
                return;
            }
    },
    getReply: function(id){
        //var id = Meteor.userId();
        var data = posts.find({parentId:id});
        var counts = data.count();
        return counts;
    },
    displayCategory: function(cat){
        console.log("ID CAT "+cat);
        return categories.findOne({_id:cat}).title;
    },
    listallmyforums: function(){
        var userid=Meteor.userId();
        return posts.find({userId:userid, parentId:"0"}); //get user logged in
    },
    listallmessagereply: function(){
        var time = new Date();
        var userid=Meteor.userId();
        return posts.find({userId:userid,parentId:{$not:"0"}}); //get user logged in
    }

});
// list all forum  user logged in
Template.myforum.helpers({
    listallmyforums: function(){
        // return posts.find();
        var userId=Meteor.userId();
        return posts.find({userId:userId}); //get user logged in
    },
    getImage: function(id) {
        var img = images.findOne({
            _id: id
        });
        if (img) {
            console.log(img.copies.images.key);
            return img.copies.images.key;
        } else {
            return;
        }
    }
});
Template.myforum.events({
    'click #delete': function(){
        var user_id = Meteor.userId();
        var id = this._id;
        if (confirm("Are u sure?")) {
            Meteor.call('deleteForum',id,user_id);
        }
    }
});

Template.forumDetail.helpers({
    listReply: function(){
        var id = this._id;
        return posts.find({parentId:id});
    },
    getName: function(){
        return Meteor.users.find({});
    }
});
Template.updateForum.events({
    "click #update":function(){
        var id = this._id;
        var userid = Meteor.userId();
        var topic = $('#topic').val();
        var description = $('#description').val();
        var image = Session.get("ADDIMAGEID");
        var forum = posts.findOne({_id:id});
        var parent_id = (forum)? forum.parentId:'';
        var time = (forum)? forum.date:'';
        var category = Session.get("CATEGORYID");
        if(topic == "" || topic == null) {
          Bert.alert( 'Please input topic', 'danger', 'growl-top-right' );
        }
        else if (description == "" || description == null) {
          Bert.alert( 'Please input description', 'danger', 'growl-top-right' );
        }
        else{
            if(Meteor.user()){
                Meteor.call('updateForum',id,userid,parent_id,topic,description,image,time,category, function(err){
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
    }
});