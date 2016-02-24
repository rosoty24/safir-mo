Meteor.methods({
	addQuestion:function(obj){
		journey.insert(obj);
	}
});