Template.manageRole.helpers({
	getUsers: function(){
		return Meteor.users.find({});
	}
});

Template.manageRole.events({
	"click #remove": function(e, tpl) {
		//alert("hellllll");
		var id=this._id;
		Meteor.call('deleteuser', id);
		
	} 
});

Template.manageRole.helpers({
	allRoles:function(){
		return Meteor.roles.find({});
	}
});

Template.manageRole.helpers({
	getRoles: function(permm){
	  console.log(permm.mygroup[0]);
	  return permm.mygroup[0];
	}
});
Template.manageRole.events({
	"click #btnAdd": function(e, tpl) {
		//alert("hellllll");
		var username=tpl.$("#username").val()
		var email=tpl.$("#email").val()
		var password=tpl.$("#password").val()
		var role=tpl.$("#mySelect").val()
		Meteor.call('registerUser',username,email,password,role);
		
	} 
});


//update user Template
Template.updateuser.helpers({
	getRoles: function(permm){
	  console.log(permm.mygroup[0]);
	  return permm.mygroup[0];
	}
});
Template.updateuser.helpers({
	allRoles:function(){
		return Meteor.roles.find({});
	}
});
Template.updateuser.helpers({
	getRoles: function(permm){
	  console.log(permm.mygroup[0]);
	  return permm.mygroup[0];
	}
});
Template.updateuser.events({
	"click #btnupdate": function(e, tpl) {
		var id=this._id;
		var username=tpl.$("#username").val()
		var email=tpl.$("#txtemail").val();
		var role=tpl.$("#mySelect").val();
		//alert(email+role);
		var attrEmail={
			username:username,
	  		emails:[{
	  			address:email,
	  			verified:false
	  		}]
	  	};
	  	var attrRole={
	  		mygroup:[role]
	  	};
		//Meteor.call('deleteuser', id);
		Meteor.call('updateEmail',id,attrEmail);
		Meteor.call('updateUserRole', id,attrRole);
		Router.go("manageRole");
	} 
});