
Session.set('shopselected','');
Template.cart.helpers({
	shopsavailable: function(productid){
		console.log("productid:"+productid);
		return shops.find({"products.product":productid});
	},
	getQuantity: function(productid,shopid){
		console.log('getting quantity of'+productid+" from "+shopid);
		if(shopid=='' || shopid==null)
			return 0;
		var currentShop=shops.find({"_id":shopid,"products.product":productid},{"products.$.quantity":1});//
		var result=currentShop.fetch();
		if(result.length==0)
			return 0;
		else
			return result[0].products[0].quantity;
	},
	shopSelected: function(){
		return Session.get('shopselected');
	}
	
});

Template.payment.helpers({
	
	pay: function(){
		Meteor.call('api',function(err,res){
			console.log('ERROR:');
			console.log(err);
			console.log('RESULT');
			console.log(res);
		});
	}
	
});

/*modifier cartview sreyden/chantern*/
// Template.header.helpers({
// 	getNameproduct: function(id_product){
// 		return products.findOne({"_id":id_product}).title;
// 	},
// 	getPriceproduct: function(id_product){
// 		var pro = products.findOne({"_id":id_product});
// 		if( pro ) return pro.price;
// 	},
// 	getShopName: function(shop){
// 		return shops.findOne({"_id":shop}).title;
// 	},
// 	items: function(){
// 		userid=Session.get('userId');
// 		console.log('cart'+	userid);
// 		var carts = cart.find({"userId":userid});
// 		console.log("count:"+carts.count());
// 		return carts;

// 	},/*
// 	total: function(){
// 		userid=Session.get('userId');
// 		console.log('cart'+	userid);
// 		var list=cart.find({"userId":userid}).fetch();
// 		var total=0;
// 		for(var i=0;i<list.length;i++){
// 			var p=products.findOne({"_id":list[i]});
// 			if( p ) 
// 				total=total+Number(p.price);
// 		}
// 		return total;

// 	},*/
// 	total: function(){
// 		return Session.get('total');
// 	},
// 	getProduct: function(id_product){
// 		return products.findOne({"_id":id_product});
// 	}
// });



Template.cart.events({
	'change select': function(e,tpl){
		var shop=tpl.$('#shop').val();
		shop=shop.replace("ObjectID(\"","");
		shop=shop.replace("\")","");
		Session.set('shopselected',shop);
	},
	'click #addtocart': function(e,tpl){
		var maxQty=tpl.$("#max").text();
		var qty=tpl.$("#qty").val();

		if(Number(qty)>Number(maxQty)){
			alert("Cannot order more than "+maxQty+" items!");
			return;
		}

		var userId=Meteor.userId();
		console.log("userid="+userId);
		//var ipAddress=this.request.connection.remoteAddress;
		var productid=this._id;
		var shopid=tpl.$("#shop").val();
		var pro = products.findOne({_id:productid})
		var subtotal = 0;
		if( pro ){
			subtotal = parseInt(qty) * parseInt(pro.price);
			cart.insert({id_product:productid,userId:userId,shop:shopid,quantity:qty,subtotal:subtotal})
		}
		
		//console.log("ipAdresse"+ipAddress);
		//Meteor.call("addToCart",userId,productid,shopid,qty);
	}
});
// Template.header.events({
// 	'click #remove': function(e){
// 		e.preventDefault();
// 		var id =this._id;
// 		Meteor.call('removemycart', id);	
// 	}
// });
