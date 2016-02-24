Meteor.methods({
   addshipcard: function(myselect,minval,maxval) {
   		var attr = {
   			name:[myselect],
   			minval:minval,
   			maxval:maxval,
   			image:'image.jpg'
   		}
      membershipcard.insert(attr);
    },
    editdata:function(id,attr){
    membershipcard.update({_id:id},{$set:attr});
  }

});
