Session.set('page',1);
Session.set('qtyAsc',0);
Session.set('qtyDec',0);
Session.set('bacodeAsc',0);
Session.set('bacodeDec',0);
Session.set('resultPage',[1]);
Session.set('sessionShop','');
Session.set("barcode",'');
// Session.set('resultShop',[]);
Template.stock.helpers({
	listsStock:function(){
		var qtyAsc = Session.get('qtyAsc');
		var qtyDec = Session.get('qtyDec');
		var bacodeAsc = Session.get('bacodeAsc');
		var bacodeDec = Session.get('bacodeDec');
		var findbarcode=Session.get("findFieldbarcode");
		if(qtyAsc == 1){
			return stock.find({},{sort: [["QTY", "asc"]]}); 
			/*var objectDataSortQTY = {};
			var listObj=[];
			resultQTY.forEach(function(item){
				//parseInt(item.QTY);
				objectDataSortQTY ={
						"_id" :item._id,
					    "RetailStoreID" :RetailStoreID,
					    "RetailStoreName" :item.RetailStoreName,
					    "Barcode" :item.Barcode ,
					    "QTY" :parseInt(item.QTY) 
				};
				listObj.push(objectDataSortQTY);
			});

			var sort_by = function(field, reverse, primer){
			   var key = primer ? 
			       function(x) {return primer(x[field])} : 
			       function(x) {return x[field]};
			   reverse = !reverse ? 1 : -1;
			   return function (a, b) {
			       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
			     } 
			  }
			listObj=listObj.sort(sort_by('QTY', true, parseInt));
			return listObj;*/

		}
		if(qtyDec == 1){
			return stock.find({},{sort: [["QTY", "desc"]]});
		}
		if(bacodeAsc == 1){
			return stock.find({},{sort: [["Barcode", "asc"]]});
		}
		if(bacodeDec == 1){
			return stock.find({},{sort: [["Barcode", "desc"]]});
		}else{
			return stock.find({});

		}
	  },
	  pageOfStock:function(){
	  	 var sesShop = Session.get("sessionShop");
	  	 var result = Meteor.call("getallstock",sesShop,function(error,result){
	  	 	var arrpage=[];
	  		if (error){
	  			console.log(error);
	  		}
	  		else{
	  			var pagenumber=result/20;
	  			for(var i=1;i<=pagenumber;i++){
	  				arrpage.push(i);
	  			}
	  			Session.set("resultPage",arrpage);
	  		}
	  	});
	  	return Session.get("resultPage");
	  },
	  shownumberpage:function(){
	  	return Session.get("page");
	  },
	  resturnSessionShop:function(){
	  	if(Session.get("sessionShop") != ""){
	  		return true;
	  	}else{
	  		return false;
	  	}
	  },
	  resturnName:function(){
	  	return Session.get("sessionShop");
	  }
});
var arr = [1,2,3];
Session.setDefault("allPages",arr);

Template.stock.events({
	'change #shopname':function(event){
		event.preventDefault();
		var name = $('#shopname').val();
		Session.set('storeName',name);
		$('.listStore').css("display","block");
		$('.listAllstore').css("display","none");
	},
	'change #barcode':function(event){
		event.preventDefault();
		var barcode = $('#barcode').val();
		Session.set('RetailBarcode',barcode);
		$('.listStore').css("display","block");
		$('.listAllstore').css("display","none");
	},
	"click .next":function(e){
		  e.preventDefault();
		  //alert("next");
		  var dnext = stock.find({}).count();
		  if(dnext<20){
		   $(".next").css("display","none");
		  }else{
		   Session.set('page',Session.get('page')+1);
		  }
 	},
 	 "click .prev":function(e){
	  e.preventDefault();
	   var dnext = stock.find({}).count();
	  if(Session.get('page')==1){
	   $(".prev").css("display","none");
	  }else{
	   Session.set('page',Session.get('page')-1);
	  }
	 },
	 "click .deletestock":function(){
	 	if (confirm("Are you sure you want to delete this?")){
			stock.remove(this._id);
		}
	 },
	 "focusout .qty":function(event){
		var qty = $(event.currentTarget).val();
		var id=this._id;
		alert('type of'+(qty));
		if (confirm("Are you sure you want to update  this Quantity?")){
			Meteor.call("updateqty",id,qty);
		}
		
	 },
	 "click .qtyascending":function(event){
	 		Session.set("qtyAsc",1);
	 		Session.set("qtyDec",0);
			delete Session.keys['qtyDec'];
			Session.set("bacodeAsc",0);
			delete Session.keys['bacodeAsc'];
			Session.set("bacodeDec",0);
			delete Session.keys['bacodeDec'];
	 },
	 "click .qtydescending":function(event){
	 		Session.set("qtyDec",1);
	 		Session.set("qtyAsc",0);
			delete Session.keys['qtyAsc'];
			Session.set("bacodeAsc",0);
			delete Session.keys['bacodeAsc'];
			Session.set("bacodeDec",0);
			delete Session.keys['bacodeDec'];
	 },
	 "click .bacodeascending":function(event){
	 		Session.set("bacodeAsc",1);
	 		Session.set("bacodeDec",0);
			delete Session.keys['bacodeDec'];
			Session.set("qtyAsc",0);
			delete Session.keys['qtyAsc'];
			Session.set("qtyDec",0);
			delete Session.keys['qtyDec'];
	 },
	 "click .bacodedescending":function(event){
	 		Session.set("bacodeDec",1);
	 		Session.set("bacodeAsc",0);
			delete Session.keys['bacodeAsc'];
			Session.set("qtyAsc",0);
			delete Session.keys['qtyAsc'];
			Session.set("qtyDec",0);
			delete Session.keys['qtyDec'];
	 },
	  "change .pagestock":function(event){
	  		var numberPageselect = $(".pagestock").val();
			Session.set("page",parseInt(numberPageselect));
	 },
	 "change .selectShop":function(event){
	 		Session.set("page",1);
	 		Session.set("barcode","");
			Session.set("sessionShop",$(".selectShop").val());
	 },
	 "focusout #searchstock":function(e){
	 	e.preventDefault();
		var datasearch=$("#searchstock").val();
		console.log("barcode " + datasearch);
		Session.set("barcode","");
		
		if (datasearch !=""){
			Session.set("sessionShop","");
			delete Session.keys['sessionShop'];
			var obj ={
				val:datasearch,
				field:""
			};
			Session.set("barcode", obj);

		}
	},
	"focusout #searchstockbyname":function(){
		var searchstockbyname=$("#searchstockbyname").val();
		console.log("searchstockbyname" +  searchstockbyname);
		Session.set("barcode","");
		
		if (searchstockbyname !=""){
			Session.set("sessionShop","");
			delete Session.keys['sessionShop'];
			var obj ={
				val:"",
				field:searchstockbyname
			};
			Session.set("barcode", obj);
		}
	}


});