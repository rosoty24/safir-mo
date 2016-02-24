Meteor.methods({
// shop 
	addShop: function(title){
		var attributes={
			title:title,
			
		};
		shops.insert(attributes);
		console.log("Inserted");
	},
	updateShop: function(id,attr) {
		shops.update({_id:id},{$set: attr});
	},
	deleteShop: function(id){
		shops.remove(id);
	},
	updateQty: function(shopid,product,qty){
		var shop=shops.findOne({_id:shopid});
		if(shop==null){
			console.log('No shop with this id');
			return;
		}
		var qties=shop.products;
		if(qties!= null && qties.length>0){
			var written=0;
			for(var i=0;i<qties.length;i++){
				var line=qties[i];
				if(line.product==product){
					shop.products[i].quantity=qty;
					written=1;
					console.log("Value updated");
				}
					
			}
			if(written==0){
				shop.products.push({"product":product,"quantity":qty});
				console.log("Value added to set");
			}
		}else{
			shop.products=[
			{"product":product,"quantity":qty}
			];
			console.log("Value added!");
		}
		console.log(JSON.stringify(shop));
		shops.update({_id:shopid},{$set: shop});
		console.log('Quantity updated');
	}
});