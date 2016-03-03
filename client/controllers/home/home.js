Template.home.rendered=function(){
	Session.set("MAKEUP", "MAKEUP");
    Session.set("ALLMAKEUP", "ALL MAKEUP");
    Session.set("ALLALLMAKEUP" , "ALL ALL MAKEUP");
    $("#makeup").html(Session.get("MAKEUP"));
    $("#all_makeup").html(Session.get("ALLMAKEUP"));
    $("#secondChild").html(Session.get("ALLALLMAKEUP"));
	var swiper = new Swiper('.swiper-container', {
		autoplay: 5000,
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        hashnav: true,
        autoplayDisableOnInteraction: true
    });

    var swiper = new Swiper('.swiper-container-product', {
        pagination: '.swiper-pagination',
        slidesPerView: 2,
        paginationClickable: true,
        spaceBetween: 30
    });
	$('#ca-container').contentcarousel();
	$('#ca-container1').contentcarousel();
	$('#ca-container2').contentcarousel();
									
};

Template.home.helpers({
	list1: function(){
		//console.log('liste:'+list_product.find().fetch().length);
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
	},
	getbanner:function(){
		return banner.find({"typebanner":"home"});
	}
});
