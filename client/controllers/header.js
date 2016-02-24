Template.header.helpers({
	getCart: function(){
		var totalItem=0;
		mycart = cart.find({userId:Session.get('userId')});
		mycart.forEach(function(value){
			//var totalItem=value.quantity;
			totalItem+=parseInt(value.quantity);
		});
		return totalItem;
	}
});