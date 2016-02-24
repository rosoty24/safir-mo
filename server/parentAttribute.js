 //insert parentAttribute
  Meteor.methods({
  inserparentAttr:function(attr){
    parentattr.insert(attr);
  },
  editparentAttr:function(id,attr){
    parentattr.update({_id:id},{$set:attr});
  }
});
