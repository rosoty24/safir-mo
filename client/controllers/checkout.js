Session.set("total", 0);
Template.confirmorder.events({
	'click #btnshopcart':function(){
		var id = order.find({_id:Session.get('orderId')});
		var add=$("#oldAddress").text();
		Meteor.call('addAdress',id,add);
		Router.go("/confirmorder2");
	},
	'click #btnAdd':function(){
		var id = order.find({_id:Session.get('orderId')});
		var add=$("#newAddress").val();
		Meteor.call('addAdress',id,add);
		Router.go("/confirmorder2");
	}
});
Template.checkout.onRendered(function(){
    var swiper = new Swiper('.swiper-container-checkout', {
        pagination: '.swiper-pagination',
        slidesPerView: 2,
        paginationClickable: true,
        spaceBetween: 30
    });
});
Template.checkout.helpers({
	resNum: function(){
		return Random.id();
	},
	getCart: function(){
		mycart = cart.find({userId:Session.get('userId')});			
		var total = 0;
		console.log("MyCart"+JSON.stringify(mycart.fetch()[0]));
		//Session.set("allcart", mycart);
		mycart.forEach( function(value,index){
			total = total + value.subtotal;
		});
		Session.set("total", total);		 
		return mycart;
	},	
	getProductInfo: function(productid){
 		return products.findOne({_id:productid});	
	},
	getImage: function(id){
		var image=products.findOne({_id:id}).image;
		
		var res = image.replace("uploads", "upload"); 
		return res;
	},
	getShopName: function(id){
		return shops.findOne({"_id":id}).name;
	},
	getProname:function(id){
		return products.findOne({_id:id}).title;
 	},
 	getPrice:function(id){
		return products.findOne({_id:id}).price;
 	},
	getTotal: function(){
		return Session.get("total");
	},
	getImageid:function(id){

		return products.findOne({_id:id}).image;
	},
	getTime:function(time){

		var d = new Date(time * 1000), // Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
		ampm = 'AM',
		time;

		if (hh > 12) {
		ampm = 'AM';
		} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
		} else if (hh == 0) {
		h = 12;
		}
		// ie: 2013-02-18, 8:35 AM
		time = hh + ':' + min +' '+ ampm;

		return time;
		}
});
Template.checkout.events({
	"click #bank":function(e,tpl){
		var resNum=$("#ResNum").val();
		var amount=$("#Amount").val();
		var t=Date.now();
		var user=Session.get('userId');
		var obj={
			resNum:resNum,
			amount:amount,
			time:t,
			user:user
		};
		console.log('inserting payment:'+JSON.stringify(obj));
		Meteor.call('addPayment',obj);

	},
	"click .qty":function(e,tmp){
		//alert("Changing qty");
		e.preventDefault();
		var qty = $(e.currentTarget).text();
		var id =this._id; //$(e.currentTarget).attr("data-id");
		var productid =this.id_product; $(e.currentTarget).attr("pro-id");
        //alert(productid);
		var pro = products.findOne({_id:productid});
		var subtotal = 0;
		if( pro ){
			subtotal = parseInt(pro.price) * parseInt(qty);
		}
		Meteor.call('updateCart',id,qty,subtotal);
		
		
		var mycart = '';
		if(Meteor.userId()){
			userid = Meteor.userId();
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}else{
			userid = Session.get('userId');
			if( userid ){
				mycart = cart.find({$and:[{order_status:0},{userId:userid}]});
			}
		}
		var total = 0;
		
		mycart.forEach( function(value,index){
			total = total + value.subtotal;
		});
		Session.set("total", total);
		//Meteor._reload.reload();
	},
	"click .glyphicon-trash":function(e,tmp){
		var id = this._id;
		return cart.remove({_id:id});
	},
	'click #removecheckout': function(e){
		e.preventDefault();
		var id =this._id;
		var itemid = $(e.currentTarget).attr("data-remove");
		if(Meteor.userId()){
			userid = Meteor.userId();
		}else{
			userid = Session.get('userId');
		}
		if(confirm("Are you sure want to delete this?")){
			Meteor.call('removemycheckout',id,function (err){
				if(err)
					console.log("Error Remove Checkout: "+err.reason);
				else
					console.log("Remove Checkout Success!!!");
			});	
		}
		//alert('had been remove!');
	},
	'click #btnAdd':function(e){
		e.preventDefault();
		userid = Session.get('userId');
		mycart = cart.find({userId:userid});	
		var total = 0;
		if(mycart.count()>0){
			var allItems=[];
			mycart.forEach( function(value){
				var item={
					"id_product": value.id_product,
					"qty": value.quantity,
					"shop": value.shop,
					"attribute": value.attribute,
					"subtotal" :value.subtotal,
					"order_status":1
				};
				total = total + value.subtotal;
				allItems.push(item);
				//alert("My"+JSON.stringify(obj));
				//arrCartId.push(value._id);
			});
			Session.setPersistent('orderId',Random.id());
			var obj={
				userid:Meteor.userId(),
				orderId:Session.get('orderId'),
				total:total,
				items: allItems
			}
			Meteor.call('insertOrder',obj);
			Router.go("/confirmorder");
		}else{
			alert('Please make order product to check out!');
		}
	},
	'click .btn_checkout':function(){
		var currentRoute = Iron.Location.get().path;
		console.log("curCHECKOUT: "+currentRoute);
        Session.set("REDIRECTCHECKOUT",currentRoute);
	}
});
Template.checkout.helpers({
	getprofile:function(){
		var id = Meteor.userId();
		return Meteor.users.findOne({_id:id});
	}
});
Template.confirmorder.helpers({
	getprofile:function(){
		var id = Meteor.userId();
		return Meteor.users.findOne({_id:id});
	},
	getAddress1:function(){
		var id = Meteor.userId();
		return Meteor.users.findOne({_id:id}).profile.address;
	}
});

Template.confirmorder2.helpers({
	getTotal: function(){
		return Session.get("total");
	},resNum: function(){
		return Random.id();
	}
});
Template.confirmorder2.events({
	'click #btnUpdate':function(e){
		//e.preventDefault();
		var idorder = Session.get('orderId');
		var delivery = $('#sel1').val();
		var userId=Meteor.userId();
		Meteor.call('addDelivery',idorder,delivery,userid);
	}
});