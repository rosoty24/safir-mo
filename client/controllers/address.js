Template.addaddress.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		//var id = Meteor.userId();
		var name = $('#name').val();
		var city = $('#city').val();
		var street = $('#street').val();
		Meteor.call('addAddress',name,city,street);
		Router.go('address');
	}
});
Template.address.helpers({
	getcountry:function(){
		return address.find({});
	}
});
Template.address.events({
	'click #remove':function(e){
		e.preventDefault();
		var id = this._id;
		//alert('userId'+id+'Address Id'+addId);
		if (confirm("Are you sure you want to delete this?")) {
			Meteor.call('deleteAddress',id);

		}
	}
});
Template.viewaddress.events({
	'click #btnid':function(){
		var result = Meteor.users.find({});//this.params.addId;
		alert('alert');
	}
});
Template.updateaddress.events({
	'click #btnclose':function(){
		Router.go('address');
	},
	'click #btnupdate':function(e){
		e.preventDefault();
		var name = $('#name').val();
		var city = $('#city').val();
		var street = $('#street').val();
		var id = this._id;
		//alert(id+name+city+street);
		var attr = {
			name:name,
			city:city,
			street:street
		}
		Meteor.call('updateAddress',id,attr);
		Router.go('address');
	}
})