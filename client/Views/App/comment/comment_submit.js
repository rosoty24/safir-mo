Template.commentSubmit.events({
  'click #btnSend': function(e, template) {
   // alert();
    e.preventDefault();
    var id = Meteor.userId();
    var title = $("#title").val();
    var body = $("#body").val();
    var rating= $("#rating").val();
    var postId = template.data._id;
    alert(postId);
    var d = new Date();
    var dateTime = d.toLocaleDateString()+' '+d.toLocaleTimeString();

    var errors = {};
    Session.set('selectedUser', id);
    var selectedUser = Session.get('selectedUser');
    var bonus = 10;
    var point = users.findOne({_id:id}).point;
        point+=bonus;
    if (! body) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }
    Meteor.call('commentInsert', title, body, rating, postId,dateTime, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $("#body").val('');
      }
    });
    if(point>0){
      Meteor.call('updatePoint',selectedUser,point);
      alert("Your points is: "+point);
    }else if (!point){
      var point = 10;
      Meteor.call('addPoint',selectedUser,point);
      alert("You have earned "+point+" points");
    }
  }
});
Template.commentSubmit.helpers({
    getUser: function (){
        var id = Meteor.userId();
        var users = Meteor.users.findOne({_id:id});
        return users.profile.firstname+' '+users.profile.lastname
    }
});