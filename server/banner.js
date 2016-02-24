 Meteor.methods({
  insertbanner:function(obj){
  	
    banner.insert(obj);
  },
  updateBanner:function(id,obj){
    banner.update({_id:id},{$set:obj});
  }
  
});
