Template.home.rendered=function(){
	$('#ca-container').contentcarousel();
	$('#ca-container1').contentcarousel();
	$('#ca-container2').contentcarousel();
									
};

Template.home.helpers({
	list1: function(){
		console.log('liste:'+list_product.find().fetch().length);
		return list_product.find().fetch()[0];
	},
	list2: function(){

		return list_product.find().fetch()[1];
	},
	list3: function(){

		return list_product.find().fetch()[2];
	},
	getProduct: function(id){
		var result =  products.findOne({"_id":id});
		return result;
	},
	contents : function(){
		var type=contents_type.findOne({"type":"Webzine"});
		if(type!=null)
			return contents.find({"typeid":type._id});
	},
	getContentImg: function(id){
		var p=contents.findOne({_id:id});
		if(p.image instanceof Array)
			return p.image[0];
		else
			return p.image;
	}
});
