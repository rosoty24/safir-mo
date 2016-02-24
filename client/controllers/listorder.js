Template.listorder.helpers({
	getOrder:function(){
		var ord = order.find({},{sort: {total:-1}});
		var arrOrder = [];
		ord.forEach(function(i){
			console.log(" total "+i.total);
			var obj = {
				_id:i._id,
				userid:i.userid,
				orderId:i.orderId,
				total:i.total,
				items:i.items,
				address:i.address,
				delivery:i.delivery,
				t:i.time,
				status:i.status
			}
			arrOrder.push(obj);
		});
		return arrOrder;
	},
	getUserorderName:function(userId){
		var result = users.findOne({_id:userId});
		return result.profile.firstname+" "+result.profile.lastname;
		
	},
	
     getuserOrder:function(id){
     	 Meteor.call("getUserOrder",id,function(error,data){
     		if(error){
     			console.log("Query problem"+error.reason);
     		}else{
     			console.log("Query succsess");
     			$("."+id).text(data);
     		}
     	});
     },
     getTime:function(time){
     	if(typeof(time) == "number"){
     	var d = new Date(time), // Convert the passed timestamp to milliseconds
		  yyyy = d.getFullYear(),
		  mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		  dd = ('0' + d.getDate()).slice(-2),   // Add leading 0.
		  hh = d.getHours(),
		  h = hh,
		  min = ('0' + d.getMinutes()).slice(-2),  // Add leading 0.
		  ampm = 'AM',
		  time;
	   
		 if (hh > 12) {
		  	h = hh - 12;
		  	ampm = 'PM';
		 } else if (hh === 12) {
	  	 h = 12;
		  	 ampm = 'PM';
		 } else if (hh == 0) {
		  	h = 12;
		 }
	 // ie: 2013-02-18, 8:35 AM 
	 	time = yyyy + '-' + mm + '-' + dd ;
	
		return time;
 		}else{
 		    return "no date";

 		}
		  
     }
});
Template.listorder.events({
	"change .status":function(e,tpl){
		e.preventDefault();
		var id = this._id;
		var status = $(e.currentTarget).val();
		var obj ={
			status:status
		}
		//alert('status '+status);
		Meteor.call('update',id,obj);
	}
});
Template.listitem.helpers({
	getItem:function(){
		return order.find();
	},
	getItemProduct:function(id_product){
		var result= products.findOne({_id:id_product});
		//console.log("tile pro "+result.title)
		return result.title;
	}
});
Template.orderItem.helpers({
	getItem:function(){
		return order.find();
	},
	getItemProduct:function(id_product){
		var result= products.findOne({_id:id_product});
		//console.log("tile pro "+result.title)
		return result.title;
	},
	getUserorderName:function(userId){
		var result = users.findOne({_id:userId});
		return result.profile.firstname+" "+result.profile.lastname;
		
	}
});
Template.orderItemShop.helpers({
	// getOrderByShop:function(){
	// 	return order.find({});
	// },
	getOrderShop:function(){
		var result = shops.find({});
		return result;
	},
	getItemProNames:function(id_product){
		var result= products.findOne({_id:id_product});
		return result.title;
	},
	getNameShop:function(){
		var shopId = Session.get('GETSHOPNAME');
		var re = order.find({shop:shopId});
		return re;
	},
	getItemOrder:function(){
		var shopId = Session.get("GETSHOPNAME");
		var ord = order.find();
		var arr = [];
		if(shopId){
			ord.forEach(function(i){
	    		i.items.forEach(function(it){
					if(it.shop == shopId){
						arr.push(it);
					}
				});
			});
		}else{
			ord.forEach(function(j){
	    		j.items.forEach(function(it){
						arr.push(it);
				});
			});
		}
		return arr;	
	}
});
Template.orderItemShop.events({
	'change .shop':function(e){
		e.preventDefault();
		var shop = $(e.currentTarget).val();
		Session.set("GETSHOPNAME", shop);
	}
});