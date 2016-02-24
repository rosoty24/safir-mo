// shops
Session.set('addshopValidation','');
Template.manageshop.helpers({
	listShop: function(){
		return shops.find({});
	},
	addshopmsg: function(){
		var msg = Session.get('addshopValidation');
		if( msg ) return msg.data;
	},
	isAddShopmsg: function(){
		var msg = Session.get('addshopValidation');
		if(msg) return true;
		else return false;
	},
	addShopSuccess: function(){
		var msg = Session.get('addshopValidation');
		if( msg ){
			if( msg.status == true ) return true;
			else return false;
		}
	}
});
 
Template.manageshop.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var title = $('#title').val();
		var msg = '';
		if( title == ''){
			msg = {status:false,data:'Shop name is require.'};
		}else{
			msg = {status:true,data:'Successfully added.'}
			var id = shops.insert({name:title, date:new Date()});
		}

		Session.set('addshopValidation', msg);
	},
	'click #remove': function(id){
		var id = this._id;
		Meteor.call('deleteShop', id)
	}
});
Template.updateshop.events({
	'click #btnUpdate': function(e){
		e.preventDefault();
		var id = $('#idRecord').val();
		var title = $('#title').val();
		if( title == ''){
			msg = {status:false,data:'Invalid! Shop name is require.'};
		}else{
			var attributes = {
				name:title
			}
			msg = {status:true,data:'Successfully updated.'}
			Meteor.call("updateShop",id, attributes);
			Router.go("/manageshop");
		}
		Session.set('addshopValidation', msg);
	}
});
Template.updateshop.helpers({
	getShop: function(){
		var id = this._id;
		var result = shops.findOne({_id:id});
		return result;
	},
	addshopmsg: function(){
		var msg = Session.get('addshopValidation');
		if( msg ) return msg.data;
	},
	isAddShopmsg: function(){
		var msg = Session.get('addshopValidation');
		if(msg) return true;
		else return false;
	}
});

Template.shopdetail.helpers({
	getProducts: function(){
		var result = products.find();
		console.log(result);
		return result;
	},
	getQuantity: function(shop,productid){
		console.log('hooo'+Template.parentData(0)._id);
		if(shop==null)
			return 0;
		var id=shop._id;
		var shop=shops.findOne({_id: id });
		var quantities=shop.products;
		if(quantities==null)
			return 0;
		else{
			var qty=0;
			for(var i=0;i<quantities.length;i++){
				var curItem=quantities[i];
				if(curItem.product==productid)
					qty=curItem.quantity;
			}
			return qty;
		}
	}
});

Template.shopdetail.events({
	'click #btnUpdate': function(e,tpl){
		e.preventDefault();
		var shopid=tpl.$("#shopid").val();
		var productId=this._id;
		var namediv="#product_"+productId;
		console.log(namediv);
		var qty=tpl.$(namediv).val();
		console.log("shop="+shopid+";productid="+productId);
		Meteor.call('updateQty',shopid,productId,qty);
		
	}
});