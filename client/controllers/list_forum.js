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
//list forum
Template.listForum.helpers({
    allForums: function(){
        //return posts.find({});
        return posts.find({parentId:"0"},{limit:Session.get('loadlimit')});
    },
    getallForum: function(){
        //return posts.find({});
        return posts.find({},{limit:Session.get('loadlimit')});
    },
     getprofile:function( userId ){
        console.log('user:'+userId);
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