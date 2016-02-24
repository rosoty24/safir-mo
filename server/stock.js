Meteor.methods({
	"updateqty":function(id,qty){
		return stock.update({_id:id},{$set:{QTY:qty}});
	},
	"getallstock":function(sesShop){
		if(sesShop != "")
			return stock.find({RetailStoreName:sesShop}).count();
		else
			return stock.find({}).count();

	}
});