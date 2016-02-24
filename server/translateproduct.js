
Meteor.methods({
	insertTran: function(obj,idproduct,lang){
		console.log('MY CALL'+JSON.stringify(obj));
		console.log('IDPRODUCT: '+idproduct);
		if(lang=="en")
			translation.insert(obj);
		else
			translation.insert(obj);
	},
	addpoint: function(userid,attr){
		Meteor.users.update({_id:userid},{$set:attr});
	}
});