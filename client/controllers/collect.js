Session.setDefault("SHOP_ID",undefined);
Template.manageCollect.helpers({
	getCollect:function(){
		var shop = Session.get("SHOP_ID");
		if(shop){
			return collect.find({shop:shop},{sort: { date: -1 }}).map(function(document, index){
				document.index = index+1;
				return document;
			});
		}else{
			return collect.find({},{sort: { date: -1 }}).map(function(document, index){
			    document.index = index+1;
			    return document;
			});
			//return collect.find();
		}
	},
	getshopname:function(shop){
		return shops.findOne({_id:shop}).name;
	},
	getShop:function(shop){
		return shops.find();
	},
	getdate:function(time){

		  var d = new Date(time * 1000), // Convert the passed timestamp to milliseconds
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
	 	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
	
		return time;
     }
});

Template.updateCollect.events({
	'click #btn-update':function(e,tpl){
		e.preventDefault();
		var id = this._id;
		alert(id);
		var shop = $('#shopName').val();
		//var shop = Session.get("SHOP_ID");
		//alert(shop);
		var status = $('#status').val();
		var date = new Date();
		var today = date.getTime();
		var timestamp = today/1000;
		//alert(status);
		var obj ={
			shop:shop,
			order:"123456789",
			date:timestamp,
			status:status
		}
		Meteor.call("Updatecollect",id,obj,function(error){
			if(error){
				console.log("Updatecollect error"+error.reason());
			}else{
				console.log("updateCollect success");
				Router.go("/manageCollect");
			}
		})
	}
});

Template.updateCollect.helpers({
	getUpdateCollect:function(){
		return shops.find();
	},
	currentCol:function(id){
		return shops.findOne({_id:id}).name;
	}
})
Template.manageCollect.events({
	'click #remove':function(){
		var id = this._id;
		if(confirm("Are you sure want to delete this?")){
			Meteor.call("deleteCollect",id);
		}
	},
	"change #shopName":function(e){
		e.preventDefault();
		var shop = $("#shopName").val();
		if(shop == "")
			Session.set("SHOP_ID",undefined);
		else
			Session.set("SHOP_ID",shop);
			
	}
});