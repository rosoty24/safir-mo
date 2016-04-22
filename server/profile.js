Meteor.methods({
   editprofile: function(id,attr) {
      Meteor.users.update({_id:id},{$set: attr});
    },
    editarray: function(id,arr) {
      Meteor.users.update({_id:id},{$addToSet: arr});
    },
    addanswer: function(id,array) {
      Meteor.users.update({_id:id},{$set: array});
    },
    imedatPoint:function(id,obj){
    	Meteor.users.update({_id:id},{$set:obj});
    },
    earnPoint: function(userid,point) {
      Meteor.users.update({_id:userid},{$set: {"profile.shipcard.point":point}});
    },
    updatestatusearnpoint:function(id){
      Meteor.users.update({_id:id},{$set: {status:1}});
    }
});