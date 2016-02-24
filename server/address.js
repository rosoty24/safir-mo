
Meteor.methods({
	// add categories
	addAddress: function(name,city,street) {
		var id = Meteor.userId();
		var attr = {
			name:name,
			city:city,
			street:street,
			userId:id
		}
      address.insert(attr);
    },
	updateAddress: function(id,attr) {
		address.update({_id:id},{$set:attr});
	},
	deleteAddress: function(id){
		address.remove(id);
	}
});